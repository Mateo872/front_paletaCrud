const URL_COLOR = import.meta.env.VITE_API_COLORS;

export const getColors = async () => {
  try {
    const response = await fetch(URL_COLOR);
    const listColors = await response.json();
    return listColors;
  } catch (error) {
    console.log(error);
  }
};

export const getColor = async (id) => {
  try {
    const response = await fetch(`${URL_COLOR}/${id}`);
    const updatedColor = await response.json();
    return updatedColor;
  } catch (error) {
    console.log(error);
  }
};

export const createColor = async (color) => {
  try {
    const response = await fetch(`${URL_COLOR}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateColor = async (id, color) => {
  try {
    const response = await fetch(`${URL_COLOR}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteConsultColor = async (id) => {
  try {
    const response = await fetch(`${URL_COLOR}/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
