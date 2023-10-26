function require_if_installed(package) {
    try {
      return require(package);
    } catch (e) {
      return null;
    }
  }