import * as fs from 'fs';
import * as path from 'path';

// Manually load .env file
const loadEnv = (filePath: string) => {
    try {
        const absolutePath = path.resolve(process.cwd(), filePath);
        if (fs.existsSync(absolutePath)) {
            console.log(`Loading ${filePath}...`);
            const content = fs.readFileSync(absolutePath, 'utf-8');
            content.split('\n').forEach(line => {
                const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
                if (match) {
                    const key = match[1];
                    let value = match[2] || '';
                    // Remove quotes if present
                    if (value.length > 0 && (value.startsWith('"') || value.startsWith("'"))) {
                        value = value.substring(1, value.length - 1);
                    }
                    process.env[key] = value;
                }
            });
        } else {
            console.log(`Skipping ${filePath} (not found)`);
        }
    } catch (e) {
        console.error(`Error loading ${filePath}:`, e);
    }
};

// Load envs before importing firebase
loadEnv('.env');
loadEnv('.env.local');

(async () => {
    console.log('Verifying Firebase Client Configuration...');

    // Debug: Print found keys
    const keys = Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_FIREBASE_'));
    console.log(`Found ${keys.length} Firebase keys in env:`, keys.join(', '));

    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.error('❌ Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing from process.env!');
        // We continue to see if the app initializes anyway (maybe cached?)
    }

    // Dynamic import to ensure env vars are loaded FIRST
    const { app } = await import('../src/lib/firebase/client');

    try {
        const options = app.options;
        console.log(`✅ Client App initialized`);
        console.log(`ℹ️  Project ID: ${options.projectId}`);
        console.log(`ℹ️  Auth Domain: ${options.authDomain}`);
        const apiKey = options.apiKey ? `${options.apiKey.substring(0, 5)}...` : 'UNDEFINED';
        console.log(`ℹ️  API Key: ${apiKey}`);

        if (options.projectId === 'seojack-crm') {
            console.log('✅ Project ID matches "seojack-crm"');
        } else {
            console.warn(`⚠️  Project ID "${options.projectId}" does NOT match expected "seojack-crm"`);
        }

        // Verify Auth Connectivity
        console.log('Testing connection to Firebase Auth...');
        const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
        const auth = getAuth(app);

        try {
            await signInWithEmailAndPassword(auth, 'test@example.com', 'wrongpassword');
        } catch (e: any) {
            if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
                console.log('✅ Successfully connected to Firebase Auth! (Received expected auth error)');
            } else {
                console.error('❌ Auth connection failed with unexpected error:', e.code, e.message);
                process.exit(1);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Client verification failed:', error);
        process.exit(1);
    }
})();
