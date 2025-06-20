<<<<<<< HEAD
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
}; 
=======
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Hero from "./hero.jsx"; 
import About from "./About.jsx";
import Products from "./Products.jsx";
import Colaboradores from "./Colaboradores.jsx";
import Pilares from "./Pilares.jsx";


export const Home = () => {
  const {store, dispatch} = useGlobalReducer()

  return (
    <div>
    <Hero/>
	  <About/>
    <Pilares/> 
	  <Products/>
	  <Colaboradores/>
    </div>
  );
};
>>>>>>> empresa/master
