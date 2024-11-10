import ResetPassword from "@components/ResetPassword";
import "@styles/globals.css";
import "@styles/responsive.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteLogout from "@components/RouteLogout";
import { useRouter } from "next/router";

function RestablecerContrasena() {
    const router = useRouter();
    const { recovertoken } = router.query; // Obtener el ID dinámico desde la URL

    return(
    <div className="home-bg">
        <ResetPassword recovertoken={recovertoken}/>
    </div>
    )
}

export default RouteLogout(RestablecerContrasena);