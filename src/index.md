---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<section class="hero is-fullheight has-bg-img">
    <div class="hero-head">
        <nav class="navbar">
            <div class="navbar-brand">
                <span class="navbar-burger burger" data-target="navbarMenuHero">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
            <div id="navbarMenuHero" class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            About
                        </a>
                        <div class="navbar-dropdown">
                            {% for page in site.pages %}
                            {% if page.about == true %}
                                <a class="navbar-item" href="{{ page.url | relative_url }}">{{ page.title | escape }}</a>
                            {% endif %}
                            {% endfor %}
                        </div>
                    </div>
                    <div class="navbar-item has-callout has-dropdown is-active">
                        <a class="navbar-item" href="./contact/">
                            Contact
                        </a>
                        <div id="contact-message" class="navbar-dropdown">
                            <a class="navbar-item" href="./contact/">
                              <i class="fa fa-arrow-up" aria-hidden="true"></i>
                              <p>After using the DASH viewer, please leave a comment here.</p>
                            </a>
                        </div>
                    </div>
                    <a class="navbar-item" href="./participants">
                        Participants
                    </a>
                    <a class="navbar-item" href="./publications">
                        Publications
                    </a>
                    <a class="navbar-item" href="./results">
                        Results
                    </a>
                </div>
            </div>
        </nav>
    </div>
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title">Digital Analysis of Syriac Handwriting</h1>
            <h2 class="subtitle">A digital paleography project that displays folia from 90% of surviving Syriac manuscripts securely dated before the twelfth century and generates custom designed script charts.</h2>
            <a id="start-button" class="button is-primary" href="./viewer/"><h2 class="subtitle">Get Started</h2></a>
        </div>
    </div>
    <div class="hero-foot">
          {%- include footer.html -%}
    </div>
</section>
