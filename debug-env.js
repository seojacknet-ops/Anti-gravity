const fs = require('fs');
const path = require('path');

try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.log('❌ .env.local file not found!');
        process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');

    console.log('--- Environment Variable Debug ---');

    let foundKeys = 0;
    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=');
            const keyName = key.trim();
            const value = valueParts.join('=').trim();

            console.log(`Found key: ${keyName}`);
            foundKeys++;

            if (keyName === 'NEXT_PUBLIC_FIREBASE_API_KEY') {
                if (value === 'your_api_key') {
                    console.log(`❌ ${keyName} is still set to placeholder "your_api_key"`);
                } else if (value.length < 10) {
                    console.log(`⚠️ ${keyName} seems too short (${value.length} chars)`);
                } else {
                    console.log(`✅ ${keyName} is set (starts with: ${value.substring(0, 4)}...)`);
                }
            }
        }
    });

    if (foundKeys === 0) {
        console.log('❌ No valid keys found! Check if lines are commented out with #');
    }

    console.log('--- End Debug ---');

} catch (error) {
    console.error('Error reading .env.local:', error);
}
