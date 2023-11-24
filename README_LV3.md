<!DOCTYPE html>
<html>
<head>
  <style>
    /* Style for the floating button (top right) */
    .floating-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #3498db;
      color: #fff; /* Text color */
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      z-index: 9999; /* Set a high z-index value */
      text-decoration: none; /* Remove default underline */
    }
    /* Style for the button at the top of the page */
    .top-button {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #3498db;
      color: #fff; /* Text color */
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      z-index: 9999; /* Set a high z-index value */
    }
    /* Style change on hover for both buttons */
    .floating-button:hover, .top-button:hover {
      opacity: 0.8; /* Reduce opacity on hover */
    }
  </style>
</head>
<body>
    <div id="content">
        <a href="README.md" class="floating-button">
        Voltar a página principal
        </a>
    </div>
    <!-- Button -->
    <a href="#" class="top-button" onclick="scrollToTop()">
        Voltar ao topo
    </a>
  <div style="height: 2000px;">


## Contents
- [Vista Lógica](#vista_lógica_5)
- [Vista de Processos](#vista_de_processos_5)
	- [SSD US150](#ssd_us150)
	- [SSD US160](#ssd_us160)
	- [SSD US170](#ssd_us170)
	- [SSD US180](#ssd_us180)
	- [SSD US190](#ssd_us190)
 	- [SSD US200](#ssd_us200)
	- [SSD US210](#ssd_us210)
	- [SSD US220](#ssd_us220)
	- [SSD US230](#ssd_us230)   
	- [SSD US240](#ssd_us240)
	- [SSD US250](#ssd_us250)
	- [SSD US260](#ssd_us260)
	- [SSD US270](#ssd_us270)
 	- [SSD US310](#ssd_us310)
	- [SSD US350](#ssd_us350)
	- [SSD US360](#ssd_us360)
	- [SSD US370](#ssd_us370) 

- [Vista de Implementação](#vista_de_implementação_4)
- [Vista Física](#vista_física_4)

# Views

## Vista Lógica
![N3_VL](./docs/nivel3/N3_VL.svg)

## Vista de Processos
### SSD US150
![N3_VP_US150](./docs/nivel3/N3_US150.svg)

### SSD US160
![N3_VP_US160](./docs/nivel3/N3_US160.svg)

### SSD US170
![N3_VP_US170](./docs/nivel3/N3_US170.svg)

### SSD US180
![N3_VP_US180](./docs/nivel3/N3_US180.svg)

### SSD US190
![N3_VP_US190](./docs/nivel3/N3_US190.svg)

### SSD US200
![N3_VP_US200](./docs/nivel3/N3_US200.svg)

### SSD US210
![N3_VP_US210](./docs/nivel3/N3_US210.svg)

### SSD US220
![N3_VP_US220](./docs/nivel3/N3_US220.svg)

### SSD US230
![N3_VP_US230](./docs/nivel3/N3_US230.svg)

### SSD US240
![N3_VP_US240](./docs/nivel3/N3_US240.svg)

### SSD US250
![N3_VP_US250](./docs/nivel3/N3_US250.svg)

### SSD US260
![N3_VP_US260](./docs/nivel3/N3_US260.svg)

### SSD US270
![N3_VP_US270](./docs/nivel3/N3_US270.svg)

### SSD US310
![N3_VP_US310](./docs/nivel3/N3_US310.svg)

### SSD US350
![N3_VP_US350](./docs/nivel3/N3_US350.svg)

### SSD US360
![N3_VP_US360](./docs/nivel3/N3_US360.svg)

### SSD US370
![N3_VP_US370](./docs/nivel3/N3_US370.svg)


## Vista de Implementação
![N3_VL](./docs/nivel3/N3_VI.svg)

## Vista Física

![N3_VF](./docs/nivel3/N3_VF.svg)



<script>
fetch('README.md')
  .then(response => response.text())
  .then(text => {
    document.getElementById('content').innerHTML = text;
  });

      function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
</script>

</body>
</html>