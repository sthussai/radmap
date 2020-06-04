

<style>
  /* START Map Navigation Bar Styling */
  .overlaynav {
    height: 0;
    width: 100%;
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
    overflow-x: hidden;
    transition: 0.5s;
  }

  .overlaynav-content {
    position: relative;
    top: 10%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }





  /* END Map Navigation Bar Styling */
  /* ALL LOADERS */
  .loader-bg {
    height: 100%;
    width: 100%;
    display: block;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background-color: white;
    /*   background-color: rgba(0,0,0, 0.5); */
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 40%;
    margin-left: 10%;
    transform: translate3d(-50%, -50%, 0);
  }


  @-moz-keyframes slide {
    0% {
      transform: scale(1);
    }

    50% {
      opacity: 0.3;
      transform: scale(2);
    }

    100% {
      transform: scale(1);
    }
  }

  @-webkit-keyframes slide {
    0% {
      transform: scale(1);
    }

    50% {
      opacity: 0.3;
      transform: scale(2);
    }

    100% {
      transform: scale(1);
    }
  }

  @-o-keyframes slide {
    0% {
      transform: scale(1);
    }

    50% {
      opacity: 0.3;
      transform: scale(2);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes slide {
    0% {
      transform: scale(1);
    }

    50% {
      opacity: 0.3;
      transform: scale(2);
    }

    100% {
      transform: scale(1);
    }
  }




  .dot {
    width: 24px;
    height: 24px;
    background: #FFDB05;
    border-radius: 100%;
    display: inline-block;
    animation: slide 1s infinite;
  }

  .dot:nth-child(1) {
    animation-delay: 0.1s;
    background: #007C41;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
    background: #FFDB05;
  }

  .dot:nth-child(3) {
    animation-delay: 0.3s;
    background: #007C41;
  }

  .dot:nth-child(4) {
    animation-delay: 0.4s;
    background: #FFDB05;
  }

  .dot:nth-child(5) {
    animation-delay: 0.5s;
    background: #007C41;
  }
</style>

<div class='loader-bg'>
  <div class="loader">
    <!--               <div class="mx-auto text-center pb-4">Department of Radiology</div> -->
    <!--    <img src="storage/radlogo.svg" alt="Radiology logo" style="max-width: 500px; min-width: 350px" class="img-fluid"> -->
    <div class="text-center">
      University of Alberta <br>
      Department of Radiology <br>

      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>

  </div>
</div>
<script>
  /* $(".loader").delay(3000).fadeOut("slow"); */
  $(window).on("load", function() {
    $(".loader-bg").delay(1000).fadeOut("slow");
  });
</script>