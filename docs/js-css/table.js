
$("#getpdf_temp").click(function(e){
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
