date: 2011-02-20
title: Parallax mit MooTools
---


Vor einigen Wochen schwirrte die [Nike Better World Website](http://www.nike.com/us/en_us/lp/better-world) in den sozialen Netzwerken umher und erhielt viel Lob, zu Recht! Neben dem Einsatz von HTML5 (darf man das noch so sagen?) wurde ein cooler Scroll-Effekt eingebaut, der sich »Parallax« nennt. Ich war ebenfalls begeistert und habe versucht das Ganze mal in eine MooTools Klasse zu packen.

## Wie funktioniert das nun?
Es fällt auf, dass es 3 verschiedene Bewegungstypen gibt. Das »window« selbst und die beiden Pfeile, welche sich unabhängig voneinander bewegen. Man braucht also erstmal ein Markup Gerüst, das bei mir folgendermaßen aussieht:



```html
      <div id="outer">
        <div id="inner">
          <header>
            <p>Inhalt</p>
          </header>
        </div>
      </div>
```


Das simple HTML-Gerüst wird nun mit Style versehen. Das »section« Element bekommt den weißen Pfeil mit farbigen Hintergrund zugewiesen während der »article« transparenten Hintergrund mit dem roten Pfeil erhält.


```css
      #outer {
        width:600px;
        height:600px;
        background:url(img/outer.jpg) no-repeat #deddd9;
      }
      #inner {
        width:600px;
        height:450px;
        background:url(img/inner.png) no-repeat;
      }
```


Bisher sieht man noch nicht viel vom Effekt. Die Dynamik bringt JavaScript. Ich habe MooTools eingesetzt, ein kompaktes, modulares und objektorientiertes Framework mit dem es möglich ist eigene Klassen zu schreiben, vllt. schreibe ich dazu künftig etwas mehr (*Memo an mich selbst).
Aber nun los. Zunächst werden die Elemente die wir bewegen wollen in den Optionen der Klasse definiert. Man benötigt weiterhin einen Startpunkt, sowie einen Faktor welcher die »background-position« des jeweiligen Elements festlegt.
In der Konstruktorfunktion »initialize« werden die Optionen gesetzt, der umgebende Container festgelegt und die Funktion, die den Effekt bringt ausgeführt. Dieser Funktion werden die definierten Optionen übergeben und dem Container ein Event vom Typ »scroll« zugewiesen. Innerhalb dieses Events wird nach der Positionsabfrage des Containers die »background-position« der Elemente neu definiert. Das geschieht indem die Position des Containers mit dem jeweiligen Faktor multipliziert wird. Das Ganze sieht dann ungefähr so aus:


```js
      var Parallax = new Class({

        Implements: [Options, Events],
        options: {
          container: window,
          el: null,
          elInner: null,
          start: 0,
          elFaktor: -0.7,
          elInnerFaktor: 1.5
        },

        initialize: function(options) {
          this.setOptions(options);
          this.container = document.id(this.options.container);
          this.go();
        },

        go: function() {
          if(this.options.el) {
            var el = this.options.el;
            var elInner = this.options.elInner;
            var elFaktor = this.options.elFaktor;
            var elInnerFaktor = this.options.elInnerFaktor;
            var start = this.options.start;
            var stop = el.getCoordinates().top + el.getSize().y;
            this.container.addEvent('scroll', function(e) {
              var containerPos = this.getScroll().y;
              if((containerPos start) && (containerPos stop)) {
                var elPos = containerPos * elFaktor;
                var elInnerPos = containerPos * elInnerFaktor;
                el.setStyle('background-position', '0 ' + elPos + 'px');
                elInner.setStyle('background-position', '0 ' + elInnerPos + 'px');
              }
            });
          }
        }
      });
```


Der letzte Schritt besteht darin eine Instanz der Klasse zu erzeugen:


```js
      window.addEvent('domready', function () {
          var myParallax = new Parallax({
              el: $('outer'),
              elInner: $('inner')
          });
      });
```


## Fazit
Es war recht einfach den Effekt nachzubilden, dennoch ist diese Klasse nicht perfekt und sicherlich ausbaufähig. Das Grundprinzip des Effekts wird jedoch klar, und das war mir wichtig. Das war also mein mehr oder weniger erster Blogeintrag. Kritik, Feedback und Anregungen sind immer gerne gewünscht.

