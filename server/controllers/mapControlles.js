import axios from "axios";

const getCoordinates = async (req, res) => {
  const { routeForm } = req.body;
  

  try {
    const startPoint = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${process.env.POS_STACK_API}&query=${routeForm.fromHouseNr}%20${routeForm.fromStreet}%20${routeForm.fromTypeOfStreet},%20${routeForm.fromCity}%20DE`
    );
    const startLat_Long = {
      lat: startPoint.data.data[0].latitude,
      lng: startPoint.data.data[0].longitude,
    };
    const endPoint = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${process.env.POS_STACK_API}&query=${routeForm.toHouseNr}%20${routeForm.toStreet}%20${routeForm.toTypeOfStreet},%20${routeForm.toCity}%20DE`
    );
    const endLat_Long = {
      lat: endPoint.data.data[0].latitude,
      lng: endPoint.data.data[0].longitude,
    };
    res.status(200).json({ startLat_Long, endLat_Long });
  } catch (err) {
    res.status(400);
  }
};

export { getCoordinates };
