import serial
import time

# Define the serial port and baud rate (make sure it matches your Arduino's configuration)
serial_port = '/dev/cu.usbmodem1201'  # Change this to your Arduino's serial port
baud_rate = 115200  # Change this to match your Arduino's baud rate

try:
    # Open the serial port
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
      # print(line)

      if line:
        decoded_line = line.decode()
        print(decoded_line)
        if isinstance(decoded_line, str):
            # uid = line[len("UID Value: "):]
            print(f"Received NFC Tag ID: {decoded_line}")  
    except KeyboardInterrupt as e:
      print(e)
      break
        
ser.close()
