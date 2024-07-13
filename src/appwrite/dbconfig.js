import config from "../config/config";

import { Client, ID , Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client(); 
    databases; 
    storage; 

    constructor (){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId); 
        this.databases = new Databases(this.client); 
        this.bucket= new Storage(this.client); 
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug, 
                {
                    title, 
                    content, 
                    featuredImage, 
                    status, 
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error :: "+ error); 
        }
    }

    async updatePost( slug,{title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug, 
                {
                    title, 
                    content, 
                    featuredImage, 
                    status
                }
            )
        } catch (error) {
            console.log("appwrite Service :: updatePost :: error :: "+error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug
            )
            return true; 
        } catch (error) {
            console.log("appwrite document :: deletePost :: error :: "+ error);
            return false; 
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite document :: getPost :: error :: "+error);
            return false; 
        }
    }

    async getPosts(queries= [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                [
                    queries
                ]
            )
        } catch (error) {
            console.log("appwrite docuemtn :: getPosts :: error :: "+error);
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error :: "+error);
            return false; 
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error :: "+error);
            return false; 
        }
    }

    async updateFile (fileId, file){
        try {
            return await this.bucket.updateFile(
                config.appwriteBucketId,
                fileId, 
                file
            )
        } catch (error) {
            console.log("appwrite service :: updateFile :: error :: "+ error);
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId, 
            fileId
        )
    }

}

const service = new Service(); 

export default service; 