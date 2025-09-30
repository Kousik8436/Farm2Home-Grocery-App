import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Farm2Home Backend Server...');
console.log('📁 Current directory:', __dirname);

// Check if .env file exists
import fs from 'fs';
const envPath = join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found!');
    process.exit(1);
}

console.log('✅ .env file found');

// Check MongoDB connection
console.log('🔍 Checking MongoDB connection...');

// Start the server
try {
    console.log('🔄 Starting server...');
    const serverProcess = exec('node index.js', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Server error:', error.message);
            return;
        }
        if (stderr) {
            console.error('⚠️ Server stderr:', stderr);
            return;
        }
        console.log('📝 Server output:', stdout);
    });

    serverProcess.stdout.on('data', (data) => {
        console.log('📊 Server:', data.toString());
    });

    serverProcess.stderr.on('data', (data) => {
        console.error('❌ Error:', data.toString());
    });

} catch (error) {
    console.error('💥 Failed to start server:', error.message);
    process.exit(1);
}