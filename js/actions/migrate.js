// We‘re using object reference, and we know that we do so – so that‘s okay
function migrate(state) {
    console.log('migrating', state);
    switch (state._version) {
        case 0:
            state.activeColorSchemeBase = 'default_';
    }

    state._version = 1;
    console.log('migrated', state);
    return state;
}

module.exports = {
    migrate
};
