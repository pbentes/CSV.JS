class CSV {
    parse(input) {
        let rows = input.split('\n');

        const emptyFiller = "P2TGNVNrRTTgsNe9"

        rows.forEach((row, i) => {
            let regex = /("([^"]|"")*")/ig; //Matches everything in quotes including nested quotes

            /*Remove empty cells*/
            row = row.replace(/;;/gi, ";" + emptyFiller + ";");
            row = row.replace(/^;/gi, emptyFiller + ";");
            row = row.replace(/;$/gi, ";" + emptyFiller);
            /*Remove empty cells*/

            let matches = String(row).match(regex); //Store all matches to the regex
            let cells = row.replace(regex, "").split(";"); //Remove all matches of the regex from the string and split the string at all ;

            let matchesI = 0;
            cells.forEach((cell, i) => {
                if(cell === "" && matches && matches[matchesI]) { //If a cell is empty and matches exist 
                    cells[i] = matches[matchesI].slice(1,-1).replace('""', '"');
                    matchesI++;
                }
                else if(cell.includes(emptyFiller)) {
                    cells[i] = cells[i].replaceAll(emptyFiller, "");
                }
            });

            rows[i] = cells;
        });
        return rows;
    }
}


/*
Usage:
    let CSV_O = new CSV(); 
    console.log(CSV_O.parse(CSV_INPUT));
*/