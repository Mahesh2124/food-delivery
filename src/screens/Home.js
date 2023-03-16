import React,{useEffect,useState} from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Card from './components/Card';
export default function Home() {

  const [foodCat,setFoodCat]=useState([]);
  const [foodItems,setFoodItems]=useState([]);
  const [search, setSearch]=useState('');

  const loadData = async ()=>{
    let response = await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1])
  }

  useEffect(()=>{
    loadData()
  },[])




  return (
    <div>
      <div><Navbar /></div>
      <div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input classNmae="form-control mb-3" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
     {/* <button className="btn btn-outline-success" type="submit">Search</button>*/}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block" style={{width:"100%",filter:"brightness(30%)" ,objectFit:"fill"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block" style={{width:"100%",filter:"brightness(30%)",objectFit:"fill"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?momos" className="d-block"style={{width:"100%",filter:"brightness(30%)",objectFit:"fill"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className='container'>
        {
          foodCat !==[]?foodCat.map((data)=>{
            return (
              <div className='row mb-3'>
            <div key ={data._id} className="fs-3 m-3">
              {data.CategoryName}
              </div>
              <hr/>
              {foodItems !==[]?foodItems.filter((item)=>(item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search)))
              .map(filterItems=>{
                return (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItems={filterItems}
                    options = {filterItems.options[0]}
                    ></Card>
                  </div>
                )
              }) 
            :<div> No Such Data Found</div>}
              </div>
            )
          }):<div>""""""""""</div>
        }

    
        </div>
        <div><Footer/></div>

      </div>
      );
}
