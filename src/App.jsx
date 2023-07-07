import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Background from "./components/Background";
import {
  createColor,
  deleteConsultColor,
  getColors,
  updateColor,
} from "./helpers/queries";
import Swal from "sweetalert2";

function App() {
  const [color, setColor] = useState("");
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedColorId, setSelectedColorId] = useState(null);

  useEffect(() => {
    getColors().then((res) => {
      if (res) {
        setBackgrounds(res);
      } else {
        Swal.fire(
          "Se produjo un error al intentar cargar los datos",
          `Intente realizar esta operación más tarde.`,
          "error"
        );
      }
    });
  }, []);

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  function handleSaveColor() {
    if (color) {
      const newColor = {
        colorName: color,
      };

      if (selectedColorId) {
        updateColor(selectedColorId, newColor).then((res) => {
          if (res.status === 200) {
            Swal.fire(
              "Color actualizado",
              `El color ${color} fue actualizado correctamente.`,
              "success"
            );
            getColors().then((res) => {
              setBackgrounds(res);
            });
            setColor("");
            setSelectedColorId(null);
          } else {
            Swal.fire(
              "Se produjo un error al intentar actualizar el color",
              `Intente realizar esta operación más tarde.`,
              "error"
            );
          }
        });
      } else {
        createColor(newColor).then((res) => {
          if (res.status === 201) {
            Swal.fire(
              "Color creado",
              `El color ${color} fue creado correctamente.`,
              "success"
            );
            getColors().then((res) => {
              setBackgrounds(res);
            });
            setColor("");
          } else {
            Swal.fire(
              "Se produjo un error al intentar crear el color",
              `Intente realizar esta operación más tarde.`,
              "error"
            );
          }
        });
      }
    }
  }
  function handleEditColor(id) {
    const selectedColor = backgrounds.find(
      (background) => background._id === id
    );

    if (selectedColor) {
      setColor(selectedColor.colorName);
      setSelectedColorId(id);
    }
  }

  function handleDeleteColor(id) {
    deleteConsultColor(id).then((res) => {
      const colorFiltered = backgrounds.filter(
        (background) => background._id === id
      );
      if (res.status === 200) {
        Swal.fire(
          "Color eliminado",
          `El color ${colorFiltered[0].colorName} fue eliminado correctamente.`,
          "success"
        );
        getColors().then((res) => {
          setBackgrounds(res);
        });
      } else {
        Swal.fire(
          "Se produjo un error al intentar eliminar el color",
          `Intente realizar esta operación más tarde.`,
          "error"
        );
      }
    });
  }

  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center mt-3 h-100">
        <div className="border p-3 d-flex flex-column">
          <h4 className="mb-0">Administrar colores</h4>
          <div className="container_color d-flex align-items-center gap-4">
            <div
              className="background"
              style={{ backgroundColor: color }}
            ></div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Ingrese un color. Ej: Blue"
              value={color}
              onChange={handleColorChange}
            />
          </div>
          <Button variant="primary" onClick={handleSaveColor}>
            Guardar
          </Button>
        </div>
        <div className="container_colors">
          {backgrounds.map((background) => (
            <Background
              key={background._id}
              name={background.colorName}
              onDelete={() => handleDeleteColor(background._id)}
              onEdit={() => handleEditColor(background._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
