<template>
    <b-navbar type="is-danger">
        <template slot="brand">
            <b-navbar-item tag="div"><h1>VueJS DEMO</h1></b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" to="/">
                Home
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/about">
                About
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item href="https://twitter.com/rnosuke">
                <b-icon
                    pack="fab"
                    icon="twitter">
                </b-icon>
            </b-navbar-item>
            <b-navbar-item href="https://github.com/rnsk/VueDemo">
                <b-icon
                    pack="fab"
                    icon="github">
                </b-icon>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
