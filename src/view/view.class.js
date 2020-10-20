class View{
    renderNewProduct(product) {
        const $productTBodyUI = document.querySelector('#almacen tbody');	

        const $productUI = document.createElement('tr');
        $productUI.id = 'prod-'+product.id;
        $productUI.innerHTML = productToTr(product);
    
        $productTBodyUI.appendChild($productUI);
    }

    renderEditProduct(product) {
        // Buscamos el producto
        const $productUI = document.getElementById('prod-'+product.id);
        if ($productUI) {            // Si está lo modificamos
            $productUI.innerHTML = productToTr(product);
        }
    }

    renderDelProduct(id) {
        // Miramos si ya está el producto
        const $productUI = document.getElementById('prod-'+id);
        if ($productUI) {
            $productUI.parentElement.removeChild($productUI);
        }
    }

    renderChangeStock(product) {
        const $productUI = document.getElementById('prod-'+product.id);
        $productUI.children[2].textContent = product.units;
        $productUI.children[4].textContent = product.productImport().toFixed(2)+' €';
    }

    renderStoreImport(total) {
        document.getElementById('total').innerHTML = total.toFixed(2);
    }

    renderErrorMessage(message) {
        const $divMessages = document.getElementById('messages');
        $divMessages.innerHTML += `
            <div class="col-sm-12 alert alert-danger">
                <span>${message}</span>
                <button type="button" class="close" aria-label="Close" onclick="this.parentElement.remove()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
    }
}

function productToTr(product) {
    
    return `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.units}</td>
        <td>${product.price}</td>
        <td>${product.productImport().toFixed(2)} €</td>
        <td>
        
        <button class="btn btn-dark aumentar"><span class="material-icons"> arrow_drop_up </span></button>
        <button class="btn btn-dark disminuir" disabled><span class="material-icons"> arrow_drop_down </span></button>
        <button class="btn btn-dark editar"><span class="material-icons"> edit </span></button>
        <button class="btn btn-dark eliminar"><span class="material-icons"> delete </span></button>    
        
        </td>`;
}

module.exports = View;
