const ingresos = [

];

const egresos = [
  
];


let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}


let totalIngresos = ()=>{
    let totalIngreso =0;
    ingresos.forEach(e => totalIngreso += e.valor);
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso =0;
    egresos.forEach(e => totalEgreso += e.valor);
    return totalEgreso;
}


let cargarCabecero =()=>{
      let presupuesto = totalIngresos() - totalEgresos();
      let porcentajeEgreso = totalEgresos()/ totalIngresos();
      document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);  
      document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
      document.getElementById('ingresos').innerHTML =formatoMoneda (totalIngresos());
      document.getElementById('egresos').innerHTML = formatoMoneda (totalEgresos());
}

const formatoMoneda = (valor)=>{
     return valor.toLocaleString('es-AR',{style:'currency', currency:'ARS', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-AR', {style:'percent', minimumFractionDigits:2})
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';
    ingresos.forEach(e => ingresosHTML+=crearIngresoHTML(e))
    document.getElementById('lista-ingresos').innerHTML= ingresosHTML;
}

const crearIngresoHTML =(ingreso)=>{
    let ingresoHTML = ` <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
          <i class="bi bi-x" onclick="eliminarIngreso(${ingreso.id})"></i>
        </button>
      </div>
    </div>
  </div>`;
  return ingresoHTML
}


const eliminarIngreso= (id)=>{
 let ingresoEliminar=ingresos.findIndex(e=> e.id==id);
 ingresos.splice(ingresoEliminar,1);
 cargarCabecero();
 cargarIngresos();
}

const cargarEgresos = ()=>{
    let egresosHTML = '';
    egresos.forEach(e => egresosHTML+=crearEgresoHTML(e))
    document.getElementById('lista-egresos').innerHTML= egresosHTML;
}

const crearEgresoHTML =(egreso)=>{
    let egresoHTML = ` 
  
  <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
              <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <i class="bi bi-x" onclick="eliminarEngreso(${egreso.id})"></i>
                </button>
              </div>
            </div>
          </div>
  
  `;
  return egresoHTML
}

const eliminarEngreso = (id)=>{
  let egresoEliminar=egresos.findIndex(e=> e.id==id);
  egresos.splice(egresoEliminar,1);
  cargarCabecero();
  cargarEgresos();
}

let agregarDato=()=>{
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if(descripcion.value !== "" && valor.value !== ''){
    if(tipo.value==="ingreso"){
      ingresos.push(new Ingreso(descripcion.value,+valor.value))
      cargarCabecero();
      cargarIngresos();
    }
    else if (tipo.value==="egreso"){
      egresos.push(new Egreso(descripcion.value,+valor.value))
      cargarCabecero();
      cargarEgresos();
    }
  }
}