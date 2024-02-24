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


JavaScript
const f = y => y++;
f = function name
y = parameters (sometimes in parentheses for multiple parameters)
y++ = if there are no other lines in {}, then that just means that you return y++

function f (parameters) {
  return y++;
}
