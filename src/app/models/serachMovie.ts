import { IProductCategory } from "./IProductCategory";

export  class Products implements IProductCategory{
    categoryId: number=0;
    category: null=null;
    constructor(categoryId:number){
        this.categoryId=categoryId;
    }
}