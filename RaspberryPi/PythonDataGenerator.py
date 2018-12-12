import requests
import random
import time
import json
import sys
from datetime import datetime, timedelta


class HealthData:
    def __init__(self, id, weight, height, isSmoker, bloodPressure, heartRate, userID, latitude, longitude, recordTime):
        self.id = id
        self.weight = weight
        self.height = height
        self.isSmoker = isSmoker
        self.bloodPressure = bloodPressure
        self.heartRate = heartRate
        self.userID = userID
        self.latitude = latitude
        self.longitude = longitude
        self.recordTime = recordTime

    def __repr__(self):
        return "{id: %s, weight: %s, Height: %s, isSmoker: %s, BloodPressure: %s, Heartrate: %s, UserID: %s, Latitude: %s, Longitude: %s, RecordTime: %s}" % (self.id, self.weight, self.height, self.isSmoker, self.bloodPressure, self.heartRate, self.userID, self.latitude, self.longitude, self.recordTime)


class PollutionData:
    def __init__(self, DustPercentage, SulphurDioxidePercentage, OxidizedNitrogenCompoundPercentage, FluorinePercentage, CarbonMonoxidPercentage, OzonePercentage, latitude, longitude, recordTime):
        self.DustPercentage = DustPercentage
        self.SulphurDioxidePercentage = SulphurDioxidePercentage
        self.OxidizedNitrogenCompoundPercentage = OxidizedNitrogenCompoundPercentage
        self.FluorinePercentage = FluorinePercentage
        self.CarbonMonoxidPercentage = CarbonMonoxidPercentage
        self.OzonePercentage = OzonePercentage
        self.latitude = latitude
        self.longitude = longitude
        self.RecordTime = recordTime

    def __repr__(self):
        return "{DustPercentage: %s, SulphurDioxidePercentage: %s, OxidizedNitrogenCompoundPercentage: %s, FluorinePercentage: %s, CarbonMonoxidPercentage: %s, OzonePercentage: %s, Latitude: %s, Longitude: %s, RecordTime: %s}" % (self.DustPercentage, self.SulphurDioxidePercentage, self.OxidizedNitrogenCompoundPercentage, self.FluorinePercentage, self.CarbonMonoxidPercentage, self.OzonePercentage, self.latitude, self.longitude, self.RecordTime)


startText = "" + "\nWelcome to the Health/Pollution data Generator \n ------------------------------------ \n The generator will make objects and post them to the api ! \n Commands: \n > HD : Will Generate HealthData \n > PD : Will Generate Pollution Data   \n------------------------------------ "

HDurl = 'https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas'
PDurl = 'https://berthaprojectusersapi.azurewebsites.net/api/Pollution'

print(startText)

starterInput = raw_input("Type your command: ")

if(starterInput == "HD"):
    userInput = raw_input("How many Objects would you like? ")
    userIDinput = raw_input("What user? ")
    userNumber = int(userInput)
    InputUserID = int(userIDinput)

    for x in range(userNumber):
        randID = random.randint(1, 3)
        randWeight = random.randint(50, 150)
        randHeight = random.randint(150, 215)
        randSmoker = random.randint(0, 2)
        randBloodPressure = str(random.randint(90, 160)) + \
            "/" + str(random.randint(60, 100))
        randHeartRate = random.randint(55, 130)
        #randLatitude = str(random.uniform(1,2) * (90 + 90) - 90)
        randLatitude = str(random.random()*360 - 180)
        #randLongititude = str(random.uniform(1,2) * (180 + 180)-180)
        randLongititude = str(random.random()*360 - 180)
        randDate = "2018" + "-" + \
            str(random.randint(0, 12)) + "-" + str(random.randint(0, 30))

        data = {"id": randID, "weight": randWeight, "height": randHeight, "isSmoker": randSmoker, "bloodPressure": randBloodPressure,
                "heartRate": randHeartRate, "userID": InputUserID, "latitude": randLatitude, "longitude": randLongititude, "recordTime": randDate}

        response = requests.post(HDurl, json=data)
        print("HealthData: was created Succesfully!")

elif(starterInput == "PD"):
    userInput = raw_input("How many Objects would you like? ")
    userNumber = int(userInput)

    for x in range(userNumber):
        randDustPercentage = random.random() * 100
        randSulphurDioxidePercentage = random.random() * 100
        randOxidizedNitrogenCompoundPercentage = random.random() * 100
        randFluorinePercentage = random.random() * 100
        randCarbonMonoxidPercentage = random.random() * 100
        randOzonePercentage = random.random() * 100
        randLatitude = str(random.random()*360 - 180)
        randLongititude = str(random.random()*360 - 180)
        randDate = "2018" + "-" + \
            str(random.randint(0, 12)) + "-" + str(random.randint(0, 30))

        data = {"dustPercentage": randDustPercentage, "sulphurDioxidePercentage": randSulphurDioxidePercentage, "oxidizedNitrogenCompoundPercentage": randOxidizedNitrogenCompoundPercentage, "fluorinePercentage":
                randFluorinePercentage, "carbonMonoxidPercentage": randCarbonMonoxidPercentage, "ozonePercentage": randOzonePercentage, "latitude": randLatitude, "longitude": randLongititude, "recordTime": randDate}

        response = requests.post(PDurl, json=data)
        print("PollutionData: was created Succesfully!")

print(response)
