import Card from 'react-bootstrap/Card';

function Cardd(props) {
  return (
    <>
      
        <div className="mb-2 mt-5 col-lg-4 col-md-6 col-sm-12">
        <Card
          style={{backgroundColor:'#1687A7',color:"#F6F5F5"}}
          
        >
          <Card.Header><i class={props.header} ></i><i class={props.head} ></i></Card.Header>
          <Card.Body>
            <Card.Title>{props.title}  </Card.Title>
            <Card.Text>
              {props.desc}
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
   
    </>
  );
}

export default Cardd;