
const MDCDialog = mdc.dialog.MDCDialog;
const MDCDialogFoundation = mdc.dialog.MDCDialogFoundation;
const util = mdc.dialog.util;

var tempdialog_ = new mdc.dialog.MDCDialog.attachTo(document.querySelector('#tempdialog_'));
var humdialog_ = new mdc.dialog.MDCDialog.attachTo(document.querySelector('#humdialog_'));
var distdialog_ = new mdc.dialog.MDCDialog.attachTo(document.querySelector('#distdialog_'));

$("#getpdf_temp").click(function(){
  document.getElementById('my-mdc-dialog-description_temp').innerHTML = "Baixar relatório do dia <strong>" + dpTemp.value + "</strong>?"
  tempdialog_.show();
  tempdialog_.listen('MDCDialog:cancel', function() {
  })
});
$("#getTemp_").click(function(){
  var columns = ["Hora", "Valor (ºC)"];
  var rows = temp_array;

  // Landscape export, 2×4 inches
  var doc = new jsPDF({
    orientation: 'portrait',
    unit: 'cm',
  });

  doc.autoTable(columns, rows, {
    //options
    startY: 5,
    margin: 2
  });

  doc.setFontSize(16);
  doc.setFontStyle('bold');
  doc.text('Mareógrafo - Relatório', 2, 2);
  doc.setFontSize(10);
  doc.setFontStyle('normal');
  doc.text("Registos do dia: " + dpTemp.value, 2, 2.4);
  doc.text("Dados do Sensor: ", 2, 3.4);
  doc.setFontStyle('bold');
  doc.text("Temperatura (DHT11)", 5, 3.4);
  doc.setFontStyle('normal')
  doc.text("Imprimido por: " + myEmail, 2, 3.8);

  doc.save("Relatorio de Humidade (" + dpTemp.value + ").pdf");
});



$("#getpdf_hum").click(function(e){
  document.getElementById('my-mdc-dialog-description_hum').innerHTML = "Baixar relatório do dia <strong>" + dpHum.value + "</strong>?"
  humdialog_.show();
  humdialog_.listen('MDCDialog:cancel', function() {
  });



});
$("#getHum_").click(function(){
  var columns = ["Hora", "Valor (%)"];
  var rows = hum_array;

  // Landscape export, 2×4 inches
  var doc = new jsPDF({
    orientation: 'portrait',
    unit: 'cm',
  });


  doc.autoTable(columns, rows, {
    //options
    startY: 5,
    margin: 2
  });

  doc.setFontSize(16);
  doc.setFontStyle('bold');
  doc.text('Mareógrafo - Relatório', 2, 2);
  doc.setFontSize(10);
  doc.setFontStyle('normal');
  doc.text("Registos do dia: " + dpHum.value, 2, 2.4);
  doc.text("Dados do Sensor: ", 2, 3.4);
  doc.setFontStyle('bold');
  doc.text("Humidade (DHT11)", 5, 3.4);
  doc.setFontStyle('normal')
  doc.text("Imprimido por: " + myEmail, 2, 3.8);

  doc.save("Relatorio de Humidade (" + dpHum.value + ").pdf");
});



$("#getpdf_dist").click(function(){

  document.getElementById('my-mdc-dialog-description_dist').innerHTML = "Baixar relatório do dia <strong>" + dpDist.value + "</strong>?"
  distdialog_.show();

  distdialog_.listen('MDCDialog:cancel', function() {
  });
});
$("#getDist_").click(function(){
  var columns = ["Hora", "Valor (cm)"];
  var rows = distance_array;

  // Landscape export, 2×4 inches
  var doc = new jsPDF({
    orientation: 'portrait',
    unit: 'cm',
  });


  doc.autoTable(columns, rows, {
    //options
    startY: 5,
    margin: 2
  });

  doc.setFontSize(16);
  doc.setFontStyle('bold');
  doc.text('Mareógrafo - Relatório', 2, 2);
  doc.setFontSize(10);
  doc.setFontStyle('normal');
  doc.text("Registos do dia: " + dpDist.value, 2, 2.4);
  doc.text("Dados do Sensor: ", 2, 3.4);
  doc.setFontStyle('bold');
  doc.text("Distância (BAT v1.2)", 5, 3.4);
  doc.setFontStyle('normal')
  doc.text("Imprimido por: " + myEmail, 2, 3.8);

  doc.save("Relatorio de Humidade (" + dpDist.value + ").pdf");
});
