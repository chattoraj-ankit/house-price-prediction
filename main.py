from fastapi import FastAPI
from pydantic import BaseModel
import pickle
from fastapi.middleware.cors import CORSMiddleware

with open('./HousePricePredictor', 'rb') as f:
    myModel = pickle.load(f)

model = myModel

'''
# Dummy Sample
{
  "X1": 2012.91,
  "X2": 32.0,
  "X3": 84.765,
  "X4": 10,
  "X5": 24.8743,
  "X6": 121.54
}
'''


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class House_prediction(BaseModel):
    transaction_date : float
    house_age : float
    nearest_metro_station_distance : float
    number_of_stores_in_circle : float
    latitude : float
    longitude : float
@app.post('/predict_price')
def predict_price(houseDetails : House_prediction):
    print("Data", houseDetails)
    myRes = model.predict([[houseDetails.transaction_date, houseDetails.house_age, houseDetails.nearest_metro_station_distance, houseDetails.number_of_stores_in_circle, houseDetails.latitude, houseDetails.longitude]])
    print("Res", myRes)
    return myRes[0]