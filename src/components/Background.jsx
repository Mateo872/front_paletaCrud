import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Background = ({ name, onDelete, onEdit }) => {
  return (
    <div className="border color p-3 d-flex flex-column">
      <h4 className="mb-0">{name}</h4>
      <div className="container_color d-flex justify-content-center">
        <div className="background" style={{ backgroundColor: name }}></div>
      </div>
      <div className="d-flex justify-content-center gap-2">
        <Button variant="primary" onClick={onEdit}>
          Editar
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Borrar
        </Button>
      </div>
    </div>
  );
};

export default Background;
