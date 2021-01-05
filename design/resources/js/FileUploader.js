{{ JS_COPYRIGHT_NOTICE }}


class FileUploader {

/*****************************************************************************/

    static uploadFile (file_object) {

	//Validate whether File is valid Excel file.
        var regex = /(.xls|.xlsx)$/;
	console.log('file path: ' + file_object.name);
        if (regex.test(file_object.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = FileUploader.onLoad                        
                    reader.readAsBinaryString(file_object);
                } else {
		    alert("This app doesn't work on Internet Explorer");
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please choose a valid Excel file.");
        }
	
    } // uploadFile
    
/*****************************************************************************/

    static onLoad (e) {

	//GetTableFromExcel(e.target.result);
	console.log('loaded file from OS');

	//Read the Excel File data in binary
        var workbook = XLSX.read(e.target.result, {
            type: 'binary'
        });
 
        //get the name of First Sheet.
        var Sheet = workbook.SheetNames[0];
 
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
	console.log(excelRows);
 
        //Create a HTML Table element.
        var myTable  = document.createElement("table");
        myTable.border = "1";
 
        //Add the header row.
        var row = myTable.insertRow(-1);
 
        //Add the header cells.
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = "Id";
        row.appendChild(headerCell);
 
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Name";
        row.appendChild(headerCell);
 
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Country";
        row.appendChild(headerCell);
        
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Age";
        row.appendChild(headerCell);
        
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Date";
        row.appendChild(headerCell);
         
         headerCell = document.createElement("TH");
        headerCell.innerHTML = "Gender";
        row.appendChild(headerCell);
 
 
        //Add the data rows from Excel file.
        for (var i = 0; i < excelRows.length; i++) {
            //Add the data row.
            var row = myTable.insertRow(-1);
 
            //Add the data cells.
            var cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Id;
 
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Name;
 
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Country;
            
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Age;
            
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Date;
            
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].Gender;
        }
        
 
/*        var ExcelTable = document.getElementById("ExcelTable");
        ExcelTable.innerHTML = "";
        ExcelTable.appendChild(myTable);*/
	
    } // onLoad
    
/*****************************************************************************/
    
} // FileUploader

export default FileUploader;


