   var kurs1 = 0.0;
   var kurs2 = 0.0;
   var waluta1 = ""; 
   var waluta2 = "";
   var waluta3 = "";

  /* pole1 wybór waluty z listy i pobór jej wartosci z api nbp*/
  function getRate(waluta)
  {
    if (waluta == "0") 
    {
       $("#kwota").prop( "disabled", true );
       $("#waluta").prop( "disabled", true );
       alert("Najpierw wybierz walutę z której chcesz przeliczyć kurs");
    }

    else if (waluta == "pln")
    {
      $("#kwota").prop( "disabled", true );
       waluta1 = waluta; 
       kurs1 = 1.0; 
       $("#waluta").prop( "disabled", false );
    }
    
    else 
    {
      $("#kwota").prop( "disabled", true );
      waluta1 = waluta; 
      var uRl = "https://api.nbp.pl/api/exchangerates/rates/a/" + waluta + "/today/?format=json";
      $.ajax({url: uRl, success: function(result)
          {
          kurs1 = result.rates["0"].mid;
          }
        })
      $("#waluta").prop( "disabled", false );
    }
  }



/* walidator pola2*/ 
function CurrencyCodeWalid()
{
$("#kwota").prop( "disabled", true );
var refresh = setTimeout(CurrencyCodeWalid, 1000);
waluta2 = $("#waluta").val(); 
waluta2 = waluta2.toLowerCase();


if( $("#waluta").val() == '')
  {
  $("#alert1").html( "<p>Wpisz kod waluty</p>" );
  }

else if(waluta2 == waluta1)
  {
  $("#alert1").html("<p>Przeliczasz tą samą walutę</p>");
  }

else if(waluta2 == "pln" || waluta2 == "eur" || waluta2 == "usd" || waluta2 == "huf"|| waluta2 == "chf" || waluta2 == "gbp" || waluta2 == "czk" || waluta2 == "thb"  || waluta2 == "aud"  || waluta2 == "hkd"  || waluta2 == "cad"  || waluta2 == "nzd"  || waluta2 == "sgd"  || waluta2 == "uah"  || waluta2 == "jpy"  || waluta2 == "dkk"  || waluta2 == "isk"  || waluta2 == "nok"  || waluta2 == "sek"  || waluta2 == "hrk"  || waluta2 == "ron"  || waluta2 == "bgn"  || waluta2 == "try"  || waluta2 == "ils"  || waluta2 == "clp"  || waluta2 == "mxn"  || waluta2 == "php"  || waluta2 == "zar"  || waluta2 == "brl"  || waluta2 == "myr"  || waluta2 == "rub"  || waluta2 == "idr"  || waluta2 == "inr"  || waluta2 == "krw"  || waluta2 == "cny"  || waluta2 == "xdr")
{
$("#alert1").html( "" );
clearTimeout(refresh);
waluta2 = $("#waluta").val(); 
waluta2 = waluta2.toLowerCase();
    if(waluta2 == "pln")
        {
         kurs2 = 1.0;
        $("#kwota").prop( "disabled", false );
        }
    else
        {
        var URL = "https://api.nbp.pl/api/exchangerates/rates/a/" + waluta2 + "/today/?format=json";
        $.ajax({url: URL, success: function(result)
        {
       kurs2 = result.rates["0"].mid;
        }})
   
       $("#kwota").prop( "disabled", false );
        }       
}

else if(waluta2 != "")
{
$("#alert1").html("<p>Podana waluta nie istnieje</p>")
}
waluta3 = waluta2;
}



/*walidacja kwoty i obliczenie wyniku*/
function quoteWalid()
{
var quoteRefresh = setTimeout(quoteWalid, 1000);
if( $("#kwota").val() == '')
  {
  $("#alert2").html( "<p>Ile chcesz przeliczyć?</p>" );
  }

else
{
    var kwota = $("#kwota").val();
    var pattern = /^\d{1,6}(\.(\d{1,2}))?$/i;
    result = pattern.test(kwota);
    
        if(result)
        {
          clearTimeout(quoteRefresh);
          $("#alert2").html( "<p></p>" );
          $('#wynik').css( "background-color", "#efefef");
          $('#wynik').css( "border", "2px solid #ddd;");
            
                   
            
            if(waluta1 == "pln")
            {
              var wynik = 0.0;
              wynik = (kwota/kurs2);
              wynik = Round(wynik, 2);
              $('#wynik').html(wynik); 
            }
            else if (waluta2 == "pln") 
            {
              var wynik = 0.0;
              wynik = (kwota*kurs1);
              wynik = Round(wynik, 2);
              $('#wynik').html(wynik); 
            }
            else
            {
            var wynik = 0.0;
            wynik = (kwota*kurs1);
            wynik= (wynik/kurs2);
            wynik = Round(wynik, 2);
            $('#wynik').html(wynik);  
            }

        }
        else 
        {
          $("#alert2").html( "<p>Podaj kwotę wg wzorca: 000000.00 </p>" );
          $('#wynik').css( "background-color", "#000");
          $('#wynik').css( "border", "2px solid #000");
        }

}
}

/*zaokrąglanie liczb, funkcja pochodzi ze strony http://yarpo.pl/2011/03/06/js-zaokraglanie-liczb-z-zadana-dokladnoscia/ */
function Round(n, k) 
{
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}
