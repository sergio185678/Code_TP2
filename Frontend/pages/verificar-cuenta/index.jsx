import VerifyAccountForm from "@components/VerifyAccountForm";
import "@styles/globals.css";
import "@styles/responsive.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteLogout from "@components/RouteLogout";

function VerificarCuenta() {
   return(
   <div className="home-bg">
       <VerifyAccountForm/>
   </div>
   )
}
export default RouteLogout(VerificarCuenta);