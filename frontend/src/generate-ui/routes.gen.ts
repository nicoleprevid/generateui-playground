
import { Routes } from '@angular/router'

export const generatedRoutes: Routes = [
  {
    path: 'productsAdmin',
    loadComponent: () =>
      import('../app/features/overrides/ProductsAdmin/ProductsAdmin.component')
        .then(m => m.ProductsAdminComponent)
  },
  {
    path: 'ProductsAdmin',
    loadComponent: () =>
      import('../app/features/overrides/ProductsAdmin/ProductsAdmin.component')
        .then(m => m.ProductsAdminComponent)
  },
  {
    path: 'createProduct',
    loadComponent: () =>
      import('../app/features/overrides/CreateProduct/CreateProduct.component')
        .then(m => m.CreateProductComponent)
  },
  {
    path: 'CreateProduct',
    loadComponent: () =>
      import('../app/features/overrides/CreateProduct/CreateProduct.component')
        .then(m => m.CreateProductComponent)
  },
  {
    path: 'deleteProduct',
    loadComponent: () =>
      import('../app/features/overrides/DeleteProduct/DeleteProduct.component')
        .then(m => m.DeleteProductComponent)
  },
  {
    path: 'DeleteProduct',
    loadComponent: () =>
      import('../app/features/overrides/DeleteProduct/DeleteProduct.component')
        .then(m => m.DeleteProductComponent)
  },
  {
    path: 'getProductById',
    loadComponent: () =>
      import('../app/features/overrides/GetProductById/GetProductById.component')
        .then(m => m.GetProductByIdComponent)
  },
  {
    path: 'GetProductById',
    loadComponent: () =>
      import('../app/features/overrides/GetProductById/GetProductById.component')
        .then(m => m.GetProductByIdComponent)
  },
  {
    path: 'getProducts',
    loadComponent: () =>
      import('../app/features/overrides/GetProducts/GetProducts.component')
        .then(m => m.GetProductsComponent)
  },
  {
    path: 'GetProducts',
    loadComponent: () =>
      import('../app/features/overrides/GetProducts/GetProducts.component')
        .then(m => m.GetProductsComponent)
  },
  {
    path: 'updateProduct',
    loadComponent: () =>
      import('../app/features/overrides/UpdateProduct/UpdateProduct.component')
        .then(m => m.UpdateProductComponent)
  },
  {
    path: 'UpdateProduct',
    loadComponent: () =>
      import('../app/features/overrides/UpdateProduct/UpdateProduct.component')
        .then(m => m.UpdateProductComponent)
  }
]
