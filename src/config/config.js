// we are using that config file to ensure that our app won't crash
// sometimes if value contains only numbers like appwrite_url contains some characters , if it doesn't contains chars it may get fails bcoz it may treat it like number
// so basically it will definitely return string value

// console.log(import.meta.env.VITE_APPWRITE_URL);



const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
