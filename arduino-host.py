import serial
import time
import requests

serial_port = '/dev/cu.usbmodem1201'  # Arduino's serial port
baud_rate = 115200  # Arduino's baud rate
URL = 'http://localhost:3002/baixaRemedio'
JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMyIsImlhdCI6MTY5NjU1MTcyNn0.PBfQYeZB8_1ZCcBJpApx2lppkJ8CCtDboT1Sb2kF3xc'
headers = {'Authorization': f"Bearer {JWT_TOKEN}"}

def is_numero(string):
    try:
        float(string)
        return True
    except ValueError:
        return False

try:
    ser = serial.Serial(serial_port, baud_rate, timeout=1)
    print(f"Listening to {serial_port} at {baud_rate} baud...")

except Exception as e:
    print("Serial communication stopped by the user.", e)
    exit(1)

while True:
    print("dentro do while")
    try:
      time.sleep(2)

      # Read a line of data from the serial port
      line = ser.readline()

      if line:
        decoded_line = line.decode()
        print(decoded_line)
        if isinstance(decoded_line, str):
            print(f"Received NFC Tag ID: {decoded_line}")  
            print(type(decoded_line))

            if(is_numero(decoded_line)):
              payload = {
                "nfcId": decoded_line.strip(),
              }

              requests.post(URL, json=payload, headers=headers)
    except KeyboardInterrupt as e:
      print(e)
      break
        
ser.close()
