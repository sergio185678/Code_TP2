import "@styles/globals.css";
import "@styles/responsive.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
    title: "DietAsist",
    description: "Controlando la diabetes juntos",
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>       
          <main className="webapp">
            {children}
          </main>     
        </body>
    </html>
  )
}

export default RootLayout