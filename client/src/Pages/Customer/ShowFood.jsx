import  { useEffect} from "react";

function ShowFood() {
    
    useEffect(() => {
      fetch("http://localhost:3000/food/all")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          
        });
    }, []);
  
   
  
    

    return (
        <>
        
        </>
    )
}

export default ShowFood