echo "Installing dependencies for the server..."
cd server || { echo "Server directory not found. Exiting."; exit 1; }
npm install

# Navigate to the client directory
echo "Installing dependencies for the client..."
cd ../client || { echo "Client directory not found. Exiting."; exit 1; }
npm install

echo "All dependencies installed successfully!"
