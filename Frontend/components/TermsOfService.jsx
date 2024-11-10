
const TermsOfService = ({isOpen, handleClose}) => {
    //
    if(!isOpen) return null;
    
    return (
        <div className="terms-os">
            <div className="flex flex-row justify-between w-[90%]"> 
                <label className="term-title font-semibold">Términos y condiciones</label>
                <button type='reset' onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 47" fill="none">
                        <path d="M13.125 34.7915L10.625 32.2915L20.625 22.2915L10.625 12.2915L13.125 9.7915L23.125 19.7915L33.125 9.7915L35.625 12.2915L25.625 22.2915L35.625 32.2915L33.125 34.7915L23.125 24.7915L13.125 34.7915Z" fill="black"/>
                    </svg> 
                </button>   
            </div>
            <hr className="mt-[30px] border-0 w-full h-px bg-[#999999]"></hr>
            <div className="mt-[25px] terms-container pf-title1 w-[90%] h-auto text-justify font-normal">
                <p className="font-semibold">1. Aceptación de los términos</p>
                <p>Al utilizar DietAsist, aceptas los presentes Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, por favor, no utilices la aplicación.</p>
                <p className="font-semibold">2. Uso de la información proporcionada</p>
                <p>La información personal que proporciones (incluyendo datos personal y médicos) se utilizará exclusivamente para brindarte recomendaciones dietéticas personalizadas. No se usará con fines comerciales ni será compartida con terceros sin tu consentimiento expreso, salvo en situaciones legales excepcionales.</p>
                <p className="font-semibold">3. Protección de datos</p>
                <p>Nos comprometemos a proteger tu información personal utilizando medidas de seguridad apropiadas para evitar accesos no autorizados, alteraciones o divulgación de tus datos. Cumplimos con las normativas aplicables en materia de protección de datos personales.</p>
                <p className="font-semibold">4. Limitación del servicio</p>
                <p>El asesor digital de DietAsist está basado en tecnología de Deep Learning y proporciona recomendaciones automáticas basadas en los datos ingresados. Sin embargo, estas respuestas no deben considerarse como sustituto del asesoramiento profesional. Las recomendaciones no reemplazan la consulta con un nutricionista, médico o cualquier otro profesional de la salud. Te sugerimos consultar a un especialista antes de realizar cambios importantes en tu dieta o tratamiento médico.</p>
                <p className="font-semibold">5. Limitación de responsabilidad</p>
                <p>DietAsist y sus desarrolladores no serán responsables de ningún daño directo o indirecto, incluidos problemas de salud derivados del uso de las recomendaciones proporcionadas por la aplicación. Las decisiones dietéticas deben ser tomadas de manera informada y en consulta con un profesional de la salud.</p>
                <p className="font-semibold">6. Propiedad intelectual</p>
                <p>Todos los derechos sobre el software, contenido y diseño de DietAsist son propiedad de sus desarrolladores. El uso no autorizado de cualquiera de estos elementos está estrictamente prohibido.</p>
                <p className="font-semibold">7. Modificación de los términos</p>
                <p>Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Notificaremos cualquier cambio relevante a través de la aplicación, y tu uso continuado implicará la aceptación de los mismos.</p>
                <p className="font-semibold">8. Contacto</p>
                <p>Para cualquier duda o solicitud relacionada con tus datos personales o los servicios de DietAsist, por favor, contacta con nosotros a través del correo electrónico: flores.ofiuco.sergio@gmail.com.</p>

            </div>
        </div>
    );
}

export default TermsOfService