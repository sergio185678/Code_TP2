import Profile from "@components/Profile";
import "@styles/globals.css";
import "@styles/responsive.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "@components/ProtectedRoute";

function Perfil() {
    return(
    <div className="home-bg">
        <Profile/>
    </div>
    )
}

export default ProtectedRoute(Perfil);