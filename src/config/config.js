const config={
appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
appwriteDatabseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

appwriteBasicDetailsCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_Basic_Details_ID),
appwriteTermDetailsCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_Terms_Details_ID),
appwriteUserDetailsCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_User_Details_ID),
appwriteAddressDetailsCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_Address_Details_ID),


appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),


}
export default config;