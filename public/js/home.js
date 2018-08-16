let socket = io.connect('http://localhost:8080')
let login = io.connect('http://localhost:8080/login')

login.on('connection', (data) => {
  console.log(data)
})


socket.on('connection', () => {
  console.log('client done!')
})




document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true
  })
})



function notificationss() {
  const not_button = document.getElementById('notification-icon')
  const not_div = document.getElementById('notifications')

  document.onclick = (e) => {
    console.log(e)
    if (e.target === not_button && not_div.style.display == 'none') {
      not_div.style.display = 'block'
    } else {
      not_div.style.display = 'none'
    }
  }

}
window.document.getElementById('notification-icon').addEventListener('click', () => {
  const not_button = document.getElementById('notification-icon')
  const not_div = document.getElementById('notifications')

  document.onclick = (e) => {
    console.log(e)
    if (e.target === not_button && not_div.style.display == 'none') {
      not_div.style.display = 'block'
    } else {
      not_div.style.display = 'none'
    }
  }

})


// ----------------------------------//

function menuicon(x) {
  x.classList.toggle("change")
  document.getElementById('sidemenu').classList.toggle('slidein')
  document.getElementById('main').classList.toggle('main')
}


function makepost(text1) {
  let text = JSON.parse(text1)

  return `<div class="user-post" id="${text._id}"><img src="../public/img/hotty5.jpg" alt="alt" />
  <div class="user-post-grid">
      <div class="user-name-min"><a href="profile/ela">Nicky Smith &middot;<small> ${text.date}</small></a><i class="small material-icons waves-effect waves-dark" id="close"onclick="delete_post('${text._id}')">close</i></div>
      <div class="post-p">${text.post}
          <hr/>
      </div>
      <div class="about-post"><i class="small material-icons waves-effect waves-teal" id="thumb_up">thumb_up</i><i class="small material-icons waves-effect waves-red" id="thumb_down">thumb_down</i></div>
  </div>
</div>`
}



function makepost2(text) {
  let main_div = document.createElement('div')

  main_div.setAttribute('class', 'user-post-grid')

}


function sendpost() {
  post = document.getElementsByTagName('textarea')[0].value

  let xml = new XMLHttpRequest()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('post').innerHTML = makepost2(this.responseText)
      document.getElementById('icon_prefix2').value = ''
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }

  xml.open('POST', `/post/${post}`, true)
  xml.send()
}






document.getElementById('refreshbtn').addEventListener('click', () => {
  document.getElementById('icon_prefix2').value = ''
})

function delete_post(id) {
  let xml = new XMLHttpRequest()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById(id).remove()
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }
  xml.open('GET', `/delete/post/${id}`, true)
  xml.send()
}

function side_bar_links(link) {
  location.replace(`${link}`)
}




// Make a post