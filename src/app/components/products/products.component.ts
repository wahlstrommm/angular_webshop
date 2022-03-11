import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICategories } from 'src/app/models/ICategories';
import { IProducts } from 'src/app/models/IProduct';
import { IProductCategory } from 'src/app/models/IProductCategory';
import { OrderToBasket } from 'src/app/models/OrderToBasket';
import { BasketService } from 'src/app/services/basket.service';
import { CategorySearchService } from 'src/app/services/category-search.service';
import { ProductSearchService } from 'src/app/services/product-search.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  searchForm = this.fb.group({
    searchText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private service: ProductsService,
    private basketService: BasketService,
    private categoryService:CategorySearchService,
    private productSearchService:ProductSearchService
  ) {}

  products: IProducts[] = [];
  productsToBasket: any[] = [];
  productsInfoToBasket:IProducts[]=[]
  itemsToBasket: any;
  allCategory:ICategories[]=[]
  resultFromSearch:IProducts[]=[]
  ngOnInit(): void {
    this.service.productsData$.subscribe((productDataFromApi) => {
      this.products = productDataFromApi;});
      this.service.getProducts();

    this.basketService.activeOrder.subscribe(
      (itemsToBasket) => (this.itemsToBasket = itemsToBasket));

    this.categoryService.getCategory();
    this.categoryService.categoryData$.subscribe(
      (allCategory)=>(this.allCategory = allCategory)
    );
    this.productSearchService.productsSerachData$.subscribe((productSerachDataFromApi)=>{
      this.resultFromSearch=productSerachDataFromApi;
    });
  }


  addItem(productId: number, product: string, price: number) {

    let order = new OrderToBasket();
    (order.productId = productId),
    (order.product =product),
    (order.price = price);

    this.productsToBasket.push(order);

    this.basketService.updateOrder(this.productsToBasket);
  }


  //För sökning samt för filterning
  stringConvertToNumber:number=0;

  filteredResult:IProducts[]=[];
  filteredList:IProducts[]=[];
  prodContainerAll:boolean=true;
  prodContainerfilter:boolean=false;

filterCategory(value:string){

    this.stringConvertToNumber=Number(value);

    this.filteredList=this.products.filter(product => {

    for (let i = 0; i < product.productCategory.length; i++){
        if(this.stringConvertToNumber== product.productCategory[i].categoryId){
          return true;
        }
    }
    return false;    
    });


   this.categoryService.getCategory();

   this.prodContainerfilter=true;

   this.prodContainerAll=false;
   this.noMoviesContainer=false;
   this.prodContainerSerach=false;
  }

  showAllMovies(){
    this.prodContainerAll=true;
    this.prodContainerfilter=false;
    this.noMoviesContainer=false;
    this.prodContainerSerach=false;
  }

  prodContainerSerach:boolean=false;
  noMoviesContainer:boolean=false;

  serachMovieByInput(){
    this.productSearchService.getProductsBySerach(this.searchForm.value.searchText);
    

    this.prodContainerSerach=true;

    this.prodContainerAll=false;
    this.noMoviesContainer=false;
    this.prodContainerfilter=false;

    if(this.resultFromSearch.length==0){
      this.noMoviesContainer=true;
      this.prodContainerAll=false;
      this.prodContainerSerach=false;
    }
    this.searchForm.reset();
  }
}
