#Welcome to Notes!
##GitHub assignment
GitHub is a tool for storing code. 
To update changes:
git add <name of file> or simply . if you want to add all changes
git commit -m "commit name"
git push

To reconcile merges:
git pull
VS should then open up a merge editor
(if something goes wrong, go git reset --hard origin/main)
reconcile the merge
git commit
ta-da!
  
##HTML
<p id="myID" class="myClass"> to set ID of an element

use <ul> or <ol> to make unordered or ordered list, every list element has <li> before it
  
<body>
  <p>Body</p>
  <header>
    <p>Header - <span>Span</span></p>
    <nav>
      Navigation
      <div>Div</div>
      <div>Div</div>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th>
          <th>Table</th>
          <th>Table</th>
        </tr>
        <tr>
          <td>table</td>
          <td>table</td>
          <td>table</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
    </aside>
  </main>

  <footer>
    <div>Footer - <span>Span</span></div>
  </footer>
</body>
 will create:
  
![image](https://github.com/ajjget/startup/assets/112976867/cc44e9ab-201d-47fe-8dbf-297368955090)

  to add links do the following: <a href="https://github.com/ajjget/startup">a mediocre GitHub repository</a>
  to add pictures do the following: <img src="image url" width="225" height="225" />
  to bold things in headers do the following: <h1>Header</h1>
  
  
  CSS for this page:
  ![image](https://github.com/ajjget/startup/assets/112976867/28d4c9c0-0046-4f19-a8cd-acf0b2e1dfec)

  * {
  font-family: sans-serif;
  color: white;
}

body {
  background-color: #000000;
}

header {
  background-color: #3d3b3a;
  padding: 1em;
  margin: 1em 0;
  border-radius: 5px;
}

h1 {
  color: #a3d4d6;
  border-bottom: solid white thin;
}

section {
  background-color: #666666;
  padding: 1em;
  margin: 1em 0;
  border-radius: 5px;
}

h2 {
  font-weight: 100;
}

li {
  list-style: square;
}

#table-data {
  background-color: #c4c4c4;
  width: 300px;
}

td,
th {
  color: black;
  text-align: center;
  border: black solid thin;
  padding: 1em;
}

footer {
  font-style: italic;
  font-size: 1.5em;
  text-align: end;
  padding: 0 1em;
}

.fly-in {
  animation: fly-from-left 1s ease-out;
}

@keyframes fly-from-left {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: trasnlateX(0%);
  }
}


CSS
Box model, from out going in
margin, border, padding, content
reference a class using .className -- not unique, can be applied to multiple things
ID's are only unique to one element
reference ID using #IDName


JavaScript
const f = y => y++;
f = function name
y = parameters (sometimes in parentheses for multiple parameters)
y++ = if there are no other lines in {}, then that just means that you return y++

function f (parameters) {
  return y++;
}

Everything in slashes is the regex, the i afterwards means case insensitive, so cat and fish
![image](https://github.com/ajjget/startup/assets/112976867/3d9dedb2-ceec-490c-966b-e6d92821712e)

answer is cow:rat:fish
![image](https://images-cdn.kahoot.it/bb5e65e6-8855-4376-9a14-a5a40ba123a9?auto=webp)

answer is ['a1', 'a2', 'a3']
![image](https://images-cdn.kahoot.it/70dfbff7-5d45-428a-bb6e-af9fe9201a0c?auto=webp)

querySelector will return the first instance of the specified element/class/ID
querySelectAll adds it to ALL instances of element/class/ID
you want to give something an ID if you don't want it to do the first element of something
when you mouse over the first paragraph (p) element, then some javascript will be executed. in this case, it's console.log (which prints out p's textContent), but it could be a function or something
![image](https://images-cdn.kahoot.it/8c549ad0-e536-4b3b-b9b9-f4927d1e2f9b?auto=webp)
const el = document.querySelector("h1")
el.textContent = "new text content"
sets text for el

how to include javascript in html
<script>1+1</script>
<script src='main.js'/> (normal way)
<div onclick='1+1' /> (event listener)

Promise functions:
run when the name, in this case p, is called. runs as background task concurrently, and code continues on. so burgers prints first, then fries while the promise waits for 10 seconds in setTimeout(), then taco. we can either accept or reject the promise. we accept it with resolve(true), so down in call to p, result is accepted for shake. if it was rejected, then the error would have been caught. then, finally, noodles is printed. so, the following is printed:
burger, fries, taco, shake, noodles
![image](https://github.com/ajjget/startup/assets/112976867/f0985605-46a8-4025-9e57-d82dce03ad5c)

await and async go together

create JS obejcts using
  { n:1 }

JSON
  {"x":3}

to deploy script:
sudo deploy.sh
to make it executable:
chmod +x deploy.sh

c260.cs.byu.edu
edu is top-level domain
byu is host domain
c260.cs is subdomain

DNS records:
domain name service -- when you are requesting a domain, it converts the domain name into the IP address that you need to access
CNAME -> canonical name maps to an alias name, so you can have more than one name that maps to same ip
