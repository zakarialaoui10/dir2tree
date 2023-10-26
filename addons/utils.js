function require_if_installed(pckg) {
    try {
      return require(pckg);
    } catch (e) {
      return null;
    }
  }
module.exports={require_if_installed}