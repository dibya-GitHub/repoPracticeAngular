export class ValidatePattern {
  public static EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  public static NUMBER = /^(0|[1-9][0-9]*)$/;
  public static DECIMAL = /[0-9]+(\.[0-9][0-9]?)?/;
}
