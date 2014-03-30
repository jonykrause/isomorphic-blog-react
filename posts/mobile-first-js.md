date: 2011-11-23
title: Mobile first JavaScript
---


Sollte es sowas geben? Im Nachfolgenden einige laute Gedanken zu diesem Thema und ein kleines Experiment.

Seit nun einiger Zeit beschäftige ich mich mit dem Konzept »Mobile first« (MF) in Verbindung mit responsive Webdesign (RWD). MF beschreibt dabei einen Designpattern bzw. eine Philosophie, die federführend von [Luke Wroblewski](http://www.lukew.com/resources/mobile_first.asp) erschaffen wurde. Bei der Erstellung einer Website widmet man sich zunächst vollständig dem Kontext mobiler Endgeräte und ist somit gezwungen sich auf das Wesentliche, den Inhalt, zu konzentrieren. Das Prinzip nötigt uns also dazu wichtige Strukturen einer Website zu ergründen um relevante Inhalte einer möglichst breiten Palette an Endgeräten und letztlich Menschen zugänglich zu machen. MF ist also ein Teil von »Progressive Enhancement«.

Wenn es vor einiger Zeit hauptsächlich der »alte Browser« war, den es zu versorgen galt müssen wir heute eine Unmenge an möglichen Clients beachten. Smartphones, Tablets, Laptops, Netbooks, Desktops, eReader, Fernseher usw. sind eine Auswahl an Geräten die über einen Browser verfügen und die Anzahl wird zukünftig nicht weniger werden. Jedes dieser Geräte sollte beim Aufrufen einer Website eine gewisses Maß an Information und Interaktion – wenn auch nur rudimentär – bereitstellen können. Ich denke es ist wirklich verdammt schwer aber gerade deshalb müssen wir uns mit Techniken beschäftigen, mit deren Hilfe wir diese Problematik bewältigen können.

Wichtig dabei ist, dass wir nicht für jedes Gerät eine extra Wurst braten wollen. Man arbeitet quasi »Bottom-up«, stellt eine Basisversion der Website bereit und enhanced dann progressive (manchmal würde englisch bloggen einfach mehr Sinn machen). Soweit also eigentlich nichts Neues.

## RWD

Neben MF gibt es RWD, eine weitere Philosophie, sogennant von [Ethan Marcotte](http://www.abookapart.com/products/responsive-web-design). Um dieses Konzept zu verwirklichen benutzen wir flexible Raster und arbeiten mit relativen Größen um letztendlich durch CSS3 Media Queries ein Layout zu erschaffen, das sich automatisch an die Bildschirmauflösung des Benutzers anpasst.

Die eigentliche Herausforderung besteht darin RWD im Sinne von MF sinnvoll einzusetzen. Es geht hierbei nämlich nicht nur um die Darstellung. Auch der technische Aufbau, die benötigten Ressourcen und das Verhalten unserer Applikation könnten so strukturiert sein, dass sie sich dynamisch an das Endgerät anpassen – und zwar mobile first! Zur Zeit ein großes Thema sind adaptive Bilder. Damit ist nicht das Skalieren gemeint, vielmehr das Laden unnötiger Ressourcen.

Beim RWD gehen wir von einer Basis aus, die sich an möglichst viele Gerät anpassen können sollte. Wir beachten dabei aber nicht unbedingt die spezifisch benötigten Ressourcen, oder Verhalten der Website, die sie in den jeweiligen Umgebungen benötigt. Einen tollen MF-Ansatz im Bezug auf CSS zeigt Nicolas Gallagher. Ausgehend von einer primitiven Basis arbeitet man sich durch die Media Queries von geringer Auflösung bis hin zur hochauflösenden Desktopversion. Wichtig dabei ist das Kaskadieren und das Überschreiben der gesetzten CSS Regeln. Wer einmal versucht hat ein »Desktop-first« Stylesheet in eine MF-Variante zu verwandeln weiß, was ich meine. Man schreibt sich dumm und dämlich und flucht höchstwahrscheinlich auch des öfteren. Es ist also gut möglich unser CSS, strukturell an unsere Philosophie anzupassen. Was ist aber mit dem Verhalten, dem JavaScript?

## AMD

[Asynchronous Module Definition](https://github.com/amdjs/amdjs-api/wiki/AMD) bezeichnet einfach gesagt einen Weg modulares JavaScript zu schreiben. Heutige, moderne Webseiten überschreiten immer mehr den Grad von Website zu Webapp und basieren fundamental auf JavaScript. Der Code wird immer komplexer und wächst bei größeren Webseiten auch mit der Zeit. Das Smartphone benötigt eventuell keine aufwendigen Animationen oder jQuery-Plugins sondern vielmehr Touch-events oder Geolacation-basierte Features. Durch die begrenzte Bandbreite und Performance ist es aber nicht förderlich eine riesig aufgeblasenes JavaScript an das mikrigste Gerät in unserer »Nahrungskette« zu senden. Wir benötigen also, ähnlich dem CSS, einen Plan für die Organisation des JavaScripts.

Da ich in letzter Zeit vermehrt JavaScript schreiben musste habe ich mir öfters Gedanken gemacht, wie ich meinen Code besser strukturieren könnte. Der Schlüssel zum Erfolg liegt für mich  im modularen Ansatz. Prinzipiell gilt also eine große JavaScript Datei in ihre einzelnen Funktionen sinnvoll zu zerlegen und diese Module je nach Anforderung zu laden. Und genau dabei kann AMD helfen. In JavaScript gibt es leider (noch) keinen nativen Module, sodass man sich selbst behelfen muss. Diese Arbeitsweise verbessert zunächst die Codeorganisation und wirkt sich positiv auf die Wartbarkeit aus. Das hat zunächst aber nichts mit RWD und MF zu tun.

## Require.js

<blockquote class="quote">
  RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node. Using a modular script loader like RequireJS will improve the speed and quality of your code.
</blockquote>

Mit [Require.js](http://requirejs.org/) ist es möglich einzelne JavaScript Dateien oder auch explizit gekapselte Module in Abhängigkeit und asynchron zu laden. Quasi ein Modul-Lader, der den AMD-Ansatz unterstützt. Ich werde nicht zu tief in die Materie eintauchen, denn Require.js hat eine sehr umfangreiche API und es wird schnell komplex. Ich bin da selbst noch am Ausprobieren und will nichts Falsches sagen. Ein umfangreicher Artikel zu diesem Thema kann das besser als ich.

## Back to MF

Wie kann uns Require.js bei unserer MF-Philosophie helfen? In Verbindung mit Feature Tests, z.B durch <code>[window.matchMedia](https://developer.mozilla.org/en-US/docs/DOM/window.matchMedia)</code> ([Polyfill](https://github.com/paulirish/matchMedia.js/)) ist es möglich eine Struktur zu schaffen, die der unserer Stylesheets ähnelt. Natürlich kann JavaScript und CSS nicht direkt verglichen werden. Die Media Queries, die unser CSS benutzt müssen/sollten auch nicht zwingend zur Einbettung bzw. Ausführung von JavaScript benutzt werden. Das Verhalten einer Website sollte geräteübergreifend möglichst konsistent sein, d.h. man sollte hier eher sparsam beim Implementieren verschiedener Verhalten sein. Das Verhalten muss auch nicht, wie das Layout, abhängig von der Bildschirmauflösung sein. Man möchte evtl. auch spezifische Gerätefeatures nutzen, wie man gleich sehen wird.

Im nachfolgenden beschreibe ich mein Experiment mit Require.js. Es ist die Spitze des Eisbergs und auch sehr jungfräulich, also bitte nicht gleich steinigen :) Require.js arbeitet, wie bereits erwähnt mit Modulen und Abhängigkeiten. Ein Modul lässt sich z.B. folgendermaßen erstellen:



```js
  define(function() {
      return {
           text: 'modul-1.js ausgeführt!'
      }
  });
```


Die Module werden nicht im globalen Namensraum definiert, sondern durch die Funktion define() gekapselt. Eine weitere Datei, die abhängig von diesem Modul ist, sieht bei diesem Experiment so aus:


```js
      // 320-up.js

      require(['modul-1'], function (a) {
         var el = document.createElement('div');
         el.innerHTML = ('320-up' + a.text);
         document.body.appendChild(el);
      });
```


Im HTML unserer Website verlinken wir zu Require.js:


```html
      <script data-main="scripts/main" src="scripts/require.js"></script>
```

Das data-main-Attribut referenziert hierbei die »Hauptweiche«, in diesem Fall die Datei main.js. Von hier aus wird alles Weitere geladen. Wir müssen unsere Scripts also nicht alle untereinander in das HTML schreiben, sondern Abhängigkeiten werden innerhalb der Scripts selbst definiert, was die Wartbarkeit verbessert. Als nächstes ein Blick in main.js:


```js
      // main.js

      ! function() {

        // Basis
         var a = document.createElement('h1');
         a.innerHTML = ('Require.js/matchMedia Experiment');
         document.body.appendChild(a);

        // Pfad zu jQuery setzen
        require.config({
            paths: { 'jquery': 'jquery-1.7.1.min' }
        });

        // Browser, die Media Queries unterstützen
        if (window.matchMedia('(min-width:780px)')) {
            require(['780-up']);
        }

        else {
          if (window.matchMedia('(min-width:320px)')) {
            require(['320-up']);
          }
        }

        // iPad spezifisch
        if (navigator.userAgent.match(/iPad/i) != null) {
            require(['iPad']);
        }

        .....


      }();
```


## Ergebnis

Wie gesagt, der Code ist wirklich nur zur Veranschaulichung. Ich habe extra einige Fälle eingebaut und kommentiert, um den Versuch zu verdeutlichen. Mithilfe von <code>window.matchMedia</code> werden Geräteeigenschaften abgefragt. Treffen die Eigenschaften zu wird der entsprechende Rattenschwanz an Dateien und Modulen geladen. Es ist so möglich alle erdenklichen Pakete zu schnüren und man ist <strong>theoretisch</strong> fähig entsprechende Pakete nur an bestimmte Geräte und Featuregruppen auszuliefern.

Durch das Aufdröseln des Codes in Module werden leider viele Requests abgefeuert. Einer der Clous an Require.js ist sein Tool zur Optimierung. Zum Ausführen dessen ist Node (oder Java) notwendig. In einem Build-File wird das Tool konfiguriert und anschließend ausgeführt. Module werden, unter Beachtung der Abhängigkeiten, gebündelt und minifiziert.

## Fazit
Was mir besonders gut an der Sache gefällt, is der Fakt, dass man genötigt wird guten Code zu schreiben. Der Ansatz verbessert die Wartbarkeit, Wiederverwendbarkeit, Lesbarkeit und damit Qualität des Codes immens. Durch klein gehaltene Module lassen sich sinnvolle Tests erarbeiten. <strong>Darum ging es mir auch in erster Linie.</strong>

Es ist zu bevorzugen <strong>auf zusätzliche HTTP-Requests zu verzichten</strong> und lediglich ein minifiziertes JavaScript File  auszuliefern. <strong>In manchen Fällen</strong> könnte es jedoch Sinn machen diese Strategien zu koppeln und benötigte Features nachträglich zu lazyloaden. Gerade bei größeren Projekten könnte ich mir sowas gut vorstellen. Durch eine solche Struktur lässt sich der MF-Gedanke also noch weiter verfeinern.
