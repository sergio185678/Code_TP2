package com.dietasist.app.services;

import com.dietasist.app.models.dto.CreateMessageDto;
import com.dietasist.app.models.dto.PredecirDto;
import com.dietasist.app.models.entity.*;
import com.dietasist.app.models.repository.*;
import com.dietasist.app.services.interfaces.IMessageService;
import com.dietasist.app.utils.ScalerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.FloatBuffer;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageService implements IMessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private PeruvianDishesRepository peruvianDishesRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AllergicIngredientRepository allergicIngredientRepository;
    @Autowired
    private ImportantIngredientRepository importantIngredientRepository;
    @Value("${flask.api.url}")
    private String flaskApiUrl;

    @Override
    public void create(CreateMessageDto createMessageDto) {

        LocalDateTime now = LocalDateTime.now();
        Chat chat=chatRepository.findById(createMessageDto.getChat_id()).orElse(null);

        PeruvianDishes peruvianDishess=null;
        if(createMessageDto.getPeruviandisheid()!=null){
            peruvianDishess=peruvianDishesRepository.findById(createMessageDto.getPeruviandisheid()).orElse(null);
        }

        if(chat!=null){
            Message message=Message.builder()
                    .msg(createMessageDto.getMsg())
                    .is_bot(createMessageDto.getIs_bot())
                    .color(createMessageDto.getColor())
                    .created_at(now)
                    .peruvianDishes(peruvianDishess)
                    .list_result(createMessageDto.getList_result())
                    .f_Porcion(createMessageDto.getF_Porcion())
                    .f_Calorias(createMessageDto.getF_Calorias())
                    .f_Carbohidratos(createMessageDto.getF_Carbohidratos())
                    .f_Proteinas(createMessageDto.getF_Proteinas())
                    .f_Grasas(createMessageDto.getF_Grasas())
                    .chat(chat)
                    .build();
            messageRepository.save(message);
        }
    }

    @Override
    public Boolean hipertension(Integer personaid) {
        User user=userRepository.findById(personaid).orElse(null);
        if(user.getHypertension() == 1){
            return true;
        }
        return false;
    }

    @Override
    public List<String> ingredientesalergicos(Integer personaid, Integer comidaid) {
        List<AllergicIngredient> allergicIngredientList=allergicIngredientRepository.findByUserId(personaid);
        PeruvianDishes peruvianDishes=peruvianDishesRepository.findById(comidaid).orElse(null);
        String input=peruvianDishes.getList_ingredient_portion();

        input = input.replace("[", "").replace("]", "").replace("'", "");

        // Paso 2: Dividir el string en componentes
        String[] components = input.split(",\\s*");

        // Paso 3: Obtener solo los nombres de los ingredientes
        List<String> ingredients = new ArrayList<>();
        for (String component : components) {
            String[] parts = component.split("/");
            ingredients.add(parts[0]);
        }

        List<String> ingredientesalergicos = new ArrayList<>();
        for (String ingredient : ingredients) {
            for (AllergicIngredient ingredientealergico : allergicIngredientList){
                if(ingredient.equals(ingredientealergico.getName())){
                    ingredientesalergicos.add(ingredient);
                }
            }
        }

        return ingredientesalergicos;
    }

    @Override
    public PredecirDto predecir(Integer personaid,Integer comidaid) {

        ScalerUtil scalerUtil = new ScalerUtil();

        User user=userRepository.findById(personaid).orElse(null);
        PeruvianDishes food=peruvianDishesRepository.findById(comidaid).orElse(null);
        List<Float> lisformodel1 = new ArrayList<>();
        lisformodel1.add(Float.valueOf(user.getCarbohydrate_required()));
        lisformodel1.add(Float.valueOf(user.getProtein_required()));
        lisformodel1.add(Float.valueOf(user.getTotalfat_required()));
        lisformodel1.add(Float.valueOf(food.getId()));
        lisformodel1.add(Float.valueOf(food.getPortion()));
        lisformodel1.add(food.getCarbohydrates());
        lisformodel1.add(food.getProtein());
        lisformodel1.add(food.getTotal_fat());

        List<Float> lisformodel2 =new ArrayList<>(lisformodel1);

        //escalar para la primera parte del modelo 1
        try {
            ScalerUtil.ScalerParams scalerParamsModel1 = scalerUtil.loadScalerParams("models/model1/scaler_params.json");
            lisformodel1=scalerUtil.scaleData(lisformodel1, scalerParamsModel1);
        } catch (IOException e) {
            e.printStackTrace();
        }

        //model1
        String individualPercentageStr = food.getIndividual_percentage();
        individualPercentageStr = individualPercentageStr.replace("[", "").replace("]", "").trim();

        if (!individualPercentageStr.isEmpty()) {
            String[] percentageArray = individualPercentageStr.split(",");
            for (String percentage : percentageArray) {
                lisformodel1.add(Float.valueOf(percentage.trim()));
            }
        }

        //model2
        String individualPortionsStr = food.getArray_portions();
        individualPortionsStr = individualPortionsStr.replace("[", "").replace("]", "").trim();

        if (!individualPortionsStr.isEmpty()) {
            String[] percentageArray2 = individualPortionsStr.split(",");
            for (String percentage : percentageArray2) {
                lisformodel2.add(Float.valueOf(percentage.trim()));
            }
        }

        //escalar para modelo2
        try {
            ScalerUtil.ScalerParams scalerParamsModel2_X = scalerUtil.loadScalerParams("models/model2/scaler_X_params.json");
            lisformodel2=scalerUtil.scaleData(lisformodel2, scalerParamsModel2_X);
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<Float> respuestamodelo1= getPredictions(lisformodel1,"/predict_model1");
        List<Float> respuestamodelo2= getPredictions(lisformodel2,"/predict_model2");

        float umbral = 0.01f;

        respuestamodelo1 = respuestamodelo1.stream()
                .map(valor -> Math.abs(valor) <= umbral ? 0f : valor)
                .collect(Collectors.toList());

        try {
            ScalerUtil.ScalerParams scalerParamsModel2_Y = scalerUtil.loadScalerParams("models/model2/scaler_Y_params.json");
            respuestamodelo2=scalerUtil.inverseScaleData(respuestamodelo2, scalerParamsModel2_Y);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Float total=respuestamodelo2.get(0);
        List<Integer> resultados = respuestamodelo1.stream()
                .map(porcentaje -> Math.round(porcentaje * total))
                .collect(Collectors.toList());

        //obteniendo los ingredientes de la comida y crear un map
        String ingrdientsfood=food.getList_ingredient_portion();
        ingrdientsfood = ingrdientsfood.replace("[", "").replace("]", "").replace("'", "").trim();
        List<String> portionsList = Arrays.asList(ingrdientsfood.split(", "));

        HashMap<String, Integer> portionsMap = new HashMap<>();
        for (String portion : portionsList) {
            String[] parts = portion.split("/");
            String name = parts[0].trim();
            int quantity = Integer.parseInt(parts[1].trim());

            portionsMap.put(name, quantity);
        }
        List<String> lista_ingredientes_principales = Arrays.asList(
                "Yuca", "Huevo", "Pollo", "Carne", "Choclo", "Lomo", "Pescado", "Cuy",
                "Papa", "Pasta", "Camote", "Papas Fritas", "Camarones", "Cerdo",
                "Arroz", "Langostinos", "Mondongo", "Frijoles", "Carne Molida"
        );

        //aca se almacenan la diferencia entre el ingrediente principal de la comida - el del modelo
        HashMap<String ,Integer> Ingre_different= new HashMap<>();

        for(Integer i=0;i<lista_ingredientes_principales.size()-1;i++){
            for(Map.Entry<String, Integer> entry:portionsMap.entrySet()){
                String key = entry.getKey();
                if(lista_ingredientes_principales.get(i).equals(key)){
                    Ingre_different.put(key,(entry.getValue()-resultados.get(i)));
                    portionsMap.put(key, resultados.get(i));
                }
            }
        }

        ///////////////////////////////////////// AGREGANDO OBTENER DATOS GENERALES DEL PLATO DE COMIDA
        List<ImportantIngredient> importantIngredientList= (List<ImportantIngredient>) importantIngredientRepository.findAll();

        Integer f_Porcion=food.getPortion();
        Integer f_Calorias=food.getCalories();
        Float f_Carbohidratos=food.getCarbohydrates();
        Float f_Proteinas=food.getProtein();
        Float f_Grasas=food.getTotal_fat();

        PredecirDto predecirDto=new PredecirDto();

        for (Map.Entry<String, Integer> entry : Ingre_different.entrySet()) {
            String key = entry.getKey();
            Integer value = entry.getValue() * -1;

            for(Integer i=0;i<importantIngredientList.size()-1;i++){
                if(importantIngredientList.get(i).getName().equals(key)){
                    f_Porcion += value;
                    f_Calorias += (int) (value * importantIngredientList.get(i).getCalo_Port());
                    f_Carbohidratos += Math.round((value * importantIngredientList.get(i).getCarbo_Port()) * 10) / 10.0f;
                    f_Proteinas += Math.round((value * importantIngredientList.get(i).getProt_Port()) * 10) / 10.0f;
                    f_Grasas += Math.round((value * importantIngredientList.get(i).getFat_Port()) * 10) / 10.0f;
                }
            }
            predecirDto.setIngredientes_resultado(portionsMap);
            predecirDto.setF_Porcion(f_Porcion);
            predecirDto.setF_Calorias(f_Calorias);
            predecirDto.setF_Carbohidratos(f_Carbohidratos);
            predecirDto.setF_Proteinas(f_Proteinas);
            predecirDto.setF_Grasas(f_Grasas);
        }

        return predecirDto;
    }

    @Override
    public Boolean obesidad_apto(Integer personaid, Integer comidaid) {
        PeruvianDishes peruvianDishe=peruvianDishesRepository.findById(comidaid).orElse(null);
        User user=userRepository.findById(personaid).orElse(null);
        Double imc= user.getWeight()/(Math.pow((user.getSize()/100.00), 2));
        if(imc>30){
            if(peruvianDishe.getCholesterol_level().equals("Alto")){
                return false;
            }
            if(peruvianDishe.getUric_acid_level().equals("Alto")){
                return false;
            }
        }
        return true;
    }

    @Override
    public Boolean colesterol_apto(Integer personaid, Integer comidaid) {
        PeruvianDishes peruvianDishe=peruvianDishesRepository.findById(comidaid).orElse(null);
        User user=userRepository.findById(personaid).orElse(null);
        if((user.getCholesterol_LDL()>=160||user.getCholesterol_total()>=240)&&peruvianDishe.getCholesterol_level().equals("Alto")){
            return false;
        }
        return true;
    }

    @Override
    public Boolean acidourico_apto(Integer personaid, Integer comidaid) {
        PeruvianDishes peruvianDishe=peruvianDishesRepository.findById(comidaid).orElse(null);
        User user=userRepository.findById(personaid).orElse(null);

        Boolean acidourioaltopersona=false;
        if(user.getUrid_acid()>=6 && user.getGender().equals("F")){
            acidourioaltopersona=true;
        }
        if(user.getUrid_acid()>=7 && user.getGender().equals("M")){
            acidourioaltopersona=true;
        }

        if(acidourioaltopersona==true && peruvianDishe.getUric_acid_level().equals("Alto")){
            return false;
        }
        else{
            return true;
        }

    }

    public List<Float> getPredictions(List<Float> inputData,String route) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<List<Float>> requestEntity = new HttpEntity<>(inputData, headers);

        ResponseEntity<PredictionResponse> response = restTemplate.exchange(
                flaskApiUrl+route,
                HttpMethod.POST,
                requestEntity,
                PredictionResponse.class
        );

        List<List<Float>> predictions = response.getBody().getPrediction();

        // Flatten the list of lists into a single list of Floats
        List<Float> flattenedPredictions = new ArrayList<>();
        for (List<Float> predictionList : predictions) {
            flattenedPredictions.addAll(predictionList);
        }

        return flattenedPredictions;
    }

    @Override
    public List<Map<String, Object>> getRecomendation(Integer personaid, Integer comidaid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = flaskApiUrl+"/predict_model_autoencoder/" + comidaid.toString();
        ResponseEntity<List> response = restTemplate.getForEntity(url, List.class);

        if (response.getStatusCode() == HttpStatus.OK) {

            List<Map<String, Object>> recomendacionesFiltradas = new ArrayList<>();

            for(Object result : response.getBody()){

                Map<String, Object> recomendacion = (Map<String, Object>) result;
                Integer platoid = (Integer) recomendacion.get("id");

                if( ingredientesalergicos(personaid,platoid).size() == 0
                && colesterol_apto(personaid,platoid) && acidourico_apto(personaid,platoid)
                        && obesidad_apto(personaid,platoid)){
                    recomendacionesFiltradas.add(recomendacion);
                }
            }
            
            return recomendacionesFiltradas.subList(0,5);

        } else {
            throw new RuntimeException("Error al obtener recomendaciones del servidor Flask");
        }
    }

}
class PredictionResponse {
    private List<List<Float>> prediction;

    public List<List<Float>> getPrediction() {
        return prediction;
    }

    public void setPrediction(List<List<Float>> prediction) {
        this.prediction = prediction;
    }
}
