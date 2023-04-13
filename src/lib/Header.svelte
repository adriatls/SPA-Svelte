<script lang="ts">
    import gitHub from '../assets/github.png'
    import linkedin from '../assets/linkedin.png'
    import email from '../assets/email.png'
</script>

<header class="header">
    <h1>Technical Challenge</h1>
    <div class="links">
        <a href="https://www.linkedin.com/in/adria-tavares/" title="Connect" target="_blank">
            <img src={linkedin} alt="Linkedin logo" class="header-img"/>
        </a>
        <a href="https://github.com/adriatls" title="See my portfolio" target="_blank">
            <img src={gitHub} alt="GitHub logo" class="header-img"/>
        </a>
        <a href="mailto:adria.silva@meta.com.br?subject=Assunto" title="Contact" target="_blank">
            <img src={email} alt="Email logo" class="header-img"/>
        </a>
    </div>
</header>

<style>
.header {
    background: #00164F;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 24px;
}
.header h1 {
    color: #FFFFFF;
    font-family: 'Open Sans';
    line-height: 100%;
}
.header-img {
    filter: invert(99%) sepia(7%) saturate(2%) hue-rotate(354deg) brightness(112%) contrast(100%);
}
.links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
@media only screen and (max-width: 375px) {
    .header {
        padding: 11px 12px;;
    }
}
</style>