import { ROLES } from './roles.data';

describe('ROLES constant', () => {
  it('should be an array', () => {
    expect(Array.isArray(ROLES)).toBe(true);
  });

  it('should contain only Role objects', () => {
    ROLES.forEach((role) => {
      expect(role).toHaveProperty('name');
      expect(typeof role.name).toBe('string');
    });
  });

  it('should contain the "admin" role', () => {
    const adminRole = ROLES.find((role) => role.name === 'admin');
    expect(adminRole).toBeDefined();
  });

  it('should contain the "viewer" role', () => {
    const viewerRole = ROLES.find((role) => role.name === 'viewer');
    expect(viewerRole).toBeDefined();
  });
});
