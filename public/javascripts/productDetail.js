
document.querySelectorAll('.toggleImage').forEach(img => {
    img.addEventListener('click', function() {
        let commentId = this.getAttribute('data-comment');
        let comment = document.getElementById(commentId);
        comment.style.display = comment.style.display === 'none' ? 'block' : 'none';
    });
});

document.querySelector('.arrow2').addEventListener('click', function() {
    document.body.scrollTop = 0; // Para Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
});
