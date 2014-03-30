date: 2010-12-27
title: MooTools im Überblick
---


MooTools ist ein JavaScript-Framework wie z.B. jQuery oder Prototype. jQuery scheint im Moment DAS Framework schlechthin zu sein. Es ist weit verbreitet und sehr beliebt. Solche Frameworks helfen uns Webworkern ungemein, indem sie vordefinierte Funktionen zur Verfügung stellen, die sonst in mühsamer Handarbeit selbst erstellt werden müssten. Jedes dieser Frameworks hat seine eigene Syntax und Philosophie. Bevor man also loslegt sollte man sich einen Überblick über die Art und Weise wie diese Frameworks funktionieren verschaffen. Auf dieser Grundlage kann man entscheiden ob es für das Einsatzgebiet sinnvoll erscheint dieses oder jenes einzusetzen. Meiner Meinung nach gibt es hier kein schlechteres oder besseres. Alle haben eine Vielzahl an Helferlein und bieten viele Wege nach Rom. Welchen Weg man beschreitet hängt imho also von persönlichen Präferenzen ab.

## Die Philosophie

Der Ansatz von MooTools liegt ganz klar in der Objektorientierung. JavaScript selbst ist zwar auch objektorientiert, jedoch ist es nicht möglich eigene Klassen, wie das z.B. in Java oder PHP üblich ist, zu erstellen. MooTools stellt uns also eigene Klassen zur Verfügung, in der wir zusammengehörige Methoden kapseln können. Der Vorteil an dieser modularen Art und Weise ist, dass man Code projektübergreifend einfach wiederverwenden kann und sich so viel Arbeit und Zeit spart. Desweiteren ist es möglich Klassen zu erweitern und voneinander erben zu lassen, dazu aber später mehr. Wer sich also in anderen objektorientierten Sprachen gut zurechtfindet wird sich schnell mit MooTools anfreunden können.

## Wie sieht eine MooTools Klasse aus?


```js
      var meineKlasse = new Class({

          //Implements
          Implements: [Options, Events],

          //Optionen mit Default-Werten
          options: {
              option1: 1,
              option2: 2
          },

          //Konstruktorfunktion; wird bei Instanziierung aufgerufen
          initialize: function (argument1, argument2, options) {

              //Setzen der Optionen
              this.setOptions(options);
          },

          //Methode
          eineMethode: function () {
              //Inhalt
          },

          //noch eine Methode
          eineAndereMethode: function () {
              //Inhalt
          }

      });
```

Das ist ein einfaches Template einer Klasse. Zum besseren Verständniß will ich die Bestandteile anhand eines Beispiels erklären.


## Die Optionen


```js
      var MeinAuto = new Class({

          Implements: Options,

          options: {
              marke: 'BMW',
              modell: 'E30',
              ps: 120,
              farbe: 'blau',
              kaputt: false
          },

      //......
```

Um überhaupt zusätzliche Optionen nutzen zu können ist es notwendig Funktionalität der »Options« Klasse zu erben, was mit »Implements« geschieht. Es können beliebig viele Optionen gesetzt werden. Eigenschaften aus bereits bestehenden Klassen können so in der eigenen Klasse verwendet werden. Die andere Methode das nachträglich möglich zu machen wäre folgende:


```js
      MeinAuto.implement({
          //neue Methode
          neueMethode: function (arg1, arg2) {
              //Inhalt
          }
      });
```


## Die Konstruktorfunktion »initialize«

Diese Funktion wird direkt während der Instanziierung ausgeführt. In unserer Auto Klasse könnte das folgendermaßen aussehen:


```js
      initialize: function (options) {
          //Festgelegte Optionen werden gesetzt
          this.setOptions(options);
          //Die Methode fahren() wird ausgeführt
          this.fahren();
      },

      //......
```


Durch die implementierte »Options« Klasse können wir auf die Methode »setOptions()« zugreifen und so unsere individuell definierten Optionen setzen. Desweiteren führen wir sofort bei Instanziierung die Methode »fahren()« aus, welche im folgenden erklärt wird.

## Methoden deklarieren


```js
      fahren: function () {
          if (this.options.kaputt == false) {
              alert("Brumm, Brumm ich fahre " + this.options.marke + " " + this.options.modell);
          } else {
              alert("Fahrzeug ist defekt und kann nicht benutzt werden!");
          }
      },
      //......
```


Zunächst fragen wir die Option »kaputt« ab. Wenn unser Auto nicht kaputt ist, wird ein »alert()« ausgeführt innerhalb dem wir auf unsere Optionen zugreifen, ansonsten erscheint die Meldung, dass unser Fahrzeug defekt ist. In diesem Stil können nun beliebig viele Methoden deklariert werden.

## Bestehende Klassen erweitern

Eine weitere tolle Eigenschaft von MooTools ist die Möglichkeit Klassen zu erweitern. Das funktioniert so:


```js
      MeinAuto.erweiterteKlasse = new Class({

          //Um welche Klasse erweitern?
          Extends: MeinAuto,

          //Optionen, Konstruktor etc...
      });
```


Damit wird die Kindklasse »erweiterteKlasse« der Klasse »MeinAuto« gebildet. Eine Kopie der Elternklasse ist nun Startpunkt für unsere Kindklasse. Zu beachten ist, dass die Elternklasse vor der Kindklasse geladen muss, da die Kindklasse ja abhängig von ihr ist.

## »Extends« vs. »Implements«

Wie weiter oben beschrieben lassen sich Eigenschaften und Methoden einer bestehenden Klasse mit »Implements« in eine neue Klasse implementieren. Was ist nun der Unterschied zwischen »Implements« und »Extends«? Beim Erweitern einer Klasse mit »Extends« wird eine Kindklasse erstellt mit einer Kopie der Elternklasse als Startpunkt. Die Kindklasse wird nicht verändert, sondern eben nur ein Template für sie geschaffen. Genau hier liegt der Unterschied. Durch »Implements« können wir unsere Klasse um Funktionen und Eigenschaften erweitern indem wir die Klasse selbst ändern. Es wird also kein Kind erzeugt, folglich ist etwas wie »this.parent()« nicht möglich. Mit »Extends« wird sozusagen der grobe Rahmen geschaffen, »Implements« verfeinert diesen.


## Unsere Auto Klasse

Um nochmal ein komplettes Bespiel zu haben habe ich ein wenig weitergesponnen und die Autoklasse gepimpt. Diese soll nur grundsätzliche Funktion und den Aufbau einer MooTools Klasse praktisch erklären und veranschaulichen. Der Sinn sei dahin gestellt ...



```js
      var MeinAuto = new Class({

          Implements: Options,

          options: {
              marke: 'BMW',
              modell: 'E30',
              ps: 120,
              farbe: 'blau',
              kaputt: false
          },

          initialize: function (options) {
              this.setOptions(options);
              this.fahren();
          },


          function () {
              if (this.options.kaputt == false) {
                  alert("Brumm, Brumm ich fahre " + this.options.marke + " " + this.options.modell);
              } else {
                  alert("Fahrzeug ist defekt und kann nicht benutzt werden!");
              }
          },

          lackieren: function () {
              var lack = prompt("Bitte Lackfarbe eingeben: ");
              this.options.farbe = lack;
              alert("Wagen wird " + lack + " lackiert");
              alert("Lackfarbe wurde geändert in: " + this.options.farbe);
          },

          tunen: function () {
              var tuning = prompt("Wie viel PS soll die Kiste haben? Momentan: " + this.options.ps);
              if (isNaN(tuning)) {
                  alert("Nur Zahlen erlaubt!");
              } else {
                  this.options.ps = tuning;
                  alert("Deine Karre hat jetzt " + this.options.ps + "PS! woohooo...");
              }

          }
      });

```


## Last but not least

Um eine Klasse letztendlich auch verwenden zu können muss ein Objekt dieser gebildet werden. Den Vorgang nennt man auch Instanziierung. Hierbei können auch Optionen gesetzt werden.



```js
      window.addEvent('domready', function () {
          var MeinObjekt = new MeinAuto({
              //eineOption: 1,
              //weitereOption: true
          });
      });
```


## Fazit

MooTools bietet ein solides Klassensystem mit dem es möglich ist viel Zeit und Arbeit zu sparen. Unser geschriebener Code kann leicht wiederverwendet werden was das Arbeiten effizienter gestaltet. Durch den modularen Aufbau können Projekte schnell ein Update erfahren und sind einfach zu warten.Eventuell hat es den ein oder anderen angeregt sich mit diesem Framework einmal genauer auseinanderzusetzen. Ergänzungen, Feedback und Kritik sind immer gerngesehen.
