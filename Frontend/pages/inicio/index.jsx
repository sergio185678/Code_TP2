import Chat from "@components/Chat";
import "@styles/globals.css";
import "@styles/responsive.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "@components/ProtectedRoute";

function Inicio() {
    return(
    <div className="home-bg">
        <Chat/>
    </div>
    )
 }

export default ProtectedRoute(Inicio);