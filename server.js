'use strict';

var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static(__dirname));
var names = "Ivelisse Inabinet Corie Carlisle Morris Mimms Aaron Araya Theresa Tullos Hettie Hooker Danette Dehner Tonie Twitchell Yoshie Yao Yaeko Youngblood Suzie Sims Karl Kimmer Kerri Kitchell Marlen Matchett Max Mcandrew Rodger Reinhardt Janette Jiggetts Josefine Jaycox Chelsey Crim Porter Peat Odell Ohlsen Perry Purpura Charline Currington Danika Downs Felicia Froman Remedios Resnick Ervin Eliason Raymonde Rosebrook Violeta Vandehey Terrie Torrance Hanh Hargrave Milo Mulhern Tarah Tinnin Boyce Brackens Allene Aylesworth Mariam Mcneilly Kaitlin Korman Ernie Ettinger Harland Hucks Torrie Thacker Joi Jessop Helena Holloway Eufemia Elling Octavio Ochoa Lyman Liechty Jesse Jacobi Wilma Wahl Scarlet Schmucker Shela Stinson Mitsue Merkle".split(" ");
var lastnames = "Boyd Batts Lavera Leroy Rafael Ros Kathe Keogh Kermit Kocsis Yuonne Yancy Modesta Morman Eneida Eger Debi Donnell Marcela Mortellaro Lorina Limon Flora Fulmer Darlena Dykstra Cherilyn Cole Kathlene Kistler Chi Carew Iesha Ivers Gaye Gullette Julieann Jahns Aron Aderholt Ema Enders Bessie Bergin Julissa Jacobo Sunny Shehane Leola Leiser Mara Moorehouse Fredrick Frampton Danae Debusk Jasper Jong Latoyia Licari Cherri Califano Carola Cato James Jaycox Chung Correira Nadia Neisler Berniece Batdorf Sarai Seder Mathilda Musante Sharron Suarez Janise Juneau Hye Hackman Carina Callas Marinda Melton Marcus Midgett Keneth Killough Sammie Specht Sima Sauage Melonie Mcferrin Leonel Lechuga Keith Kempton".split(" ");
var emails = "twgrxhzk8re.s@ad-vh48c8l.com 55xuxlbh@rr4xecsugr.com vb4@35x610j.com b.kzkl73@3xo817r8msc.com 71osudq6sg7sqt@21mrs-7oz.com wdnz.9s1j-im@na5t6k9nayz.com 1ounfo-i3@viwb86z.com ne.8@0k4llra.com 1hgbmv_vkv49w@y2v3887836.com gsbhl@y7r484m7m.com dta4iwtftoc@jii5o16v.com rtl@nlyiyjy23.com akaf4phayq7@bfywggcyr.com ezypmpga@8fj9kamqa075.com txh1z8fc7k3s1c8@5b20ly.com a1n_wg@0vyu3mhx.com s5._rb6kd@uipir2i.com h3jgm@8zdj82.com iugg.i.jmvs3@49rbdti.com pf1di_._2ggjm@mitmr670vy7.com aw-@4nm9bpf-pe.com l_9yhq_1l7y8@st8hssfl6.com 00p0mtx96@v3q3hpq.com cn4wk.d4e@oxwxtsb.com vb2nys5p@yh6fq8shs3g.com l.g0y2qzfi@hg9u4omhc.com i._3hrtob@bybhvy.com mbiuifdauqix_k@49iteyar1cf2.com qg24h-@kpcnqw4yh39.com gu6@5ukuwql7f2.com".split(" ");

function randomInt(min, max) {
  return Math.floor((Math.random() * max) + min)
}

app.get('/list', function(req, res) {
  var out = [];
  for (var i = 0; i < 100; i++) {
    out.push({
      id: i,
      firstName: names[randomInt(0, 100)],
      lastName: lastnames[randomInt(0, 100)],
      emails: (function() {
        var limit = randomInt(1, 3),
          out = [];
        for (let i = 0; i < limit; i++) {
          out.push({
            type: i % 2 === 0 ? 'Work' : 'Home',
            value: emails[randomInt(0, emails.length)]
          });
        }
        return out;
      })(),
      phones: (function() {
        var limit = randomInt(1, 3),
          out = [];
        for (let i = 0; i < limit; i++) {
          out.push({
            type: i % 2 === 0 ? 'Work' : 'Home',
            value: i % 2 === 0 ? '+0201231231' : '+911231231'
          });
        }
        return out;
      })()
    });
  }
  res.send(out);
})

app.get('/', function(req, res) {
  fs.readFile('./index.html', function(err, data) {
    res.end(data);
  });
})

var server = app.listen(3000, "localhost", function() {
  var host = server.address().address
  var port = server.address().port

  console.log("App started", host, port)
})